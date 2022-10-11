import { LoginRequestBody } from './interfaces/login-request-body';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AwsService } from '../aws/aws.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './interfaces/user-token';
import { UserPayload } from './interfaces/user-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly awsService: AwsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;

      const userExists = await this.usersService.findByEmail(email);

      if (userExists) throw new BadRequestException('User already exists!');

      const createUser = await this.usersService.create(createUserDto);

      if (createUser) {
        await this.awsService
          .register({
            email: createUser.email,
            name: createUser.name,
            hash_password: await bcrypt.hash(createUserDto.hash_password, 10),
          })
          .then(() => createUser)
          .catch(async (e) => {
            await this.usersService.delete(createUser.id);
            throw new BadRequestException(e.message);
          });
      }
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(loginRequestBody: LoginRequestBody) {
    try {
      const { email, password } = loginRequestBody;

      const userExists = await this.usersService.findByEmail(email);

      if (userExists) {
        return await this.awsService.authenticateUserAwsCognito({
          email,
          password,
        });
      }
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
