import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthRequestDto } from './dtos/auth-request.dto';
import { AwsService } from '../aws/aws.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly awsService: AwsService,
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

  async authenticateUser(authRequest: AuthRequestDto) {
    try {
      const { username, password } = authRequest;

      const userExists = await this.usersService.findByEmail(username);

      if (userExists) {
        return await this.awsService.authenticateUserAwsCognito({
          username,
          password,
        });
      }
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
