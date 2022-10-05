import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthRequestDto } from './dtos/auth-request.dto';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly awsService: AwsService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;

      const userExists = this.usersService.findOneByEmail({ email });

      if (userExists) throw new BadRequestException('User already exists!');

      const createUser = await this.usersService.create(createUserDto);

      await this.awsService.register({
        email: createUser.email,
        name: createUser.name,
        hash_password: createUser.hash_password,
      });

      return createUser;
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }

  async authenticateUser(authRequest: AuthRequestDto) {
    return;
  }
}
