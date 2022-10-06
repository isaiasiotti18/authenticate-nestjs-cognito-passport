import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      hash_password: await bcrypt.hash(createUserDto.hash_password, 10),
    };

    const createdUser = await this.usersRepository.create(data);

    return {
      ...createdUser,
      hash_password: undefined,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAll();
    return users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        id: user.id,
        hash_password: undefined,
      };
    });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findByEmail(email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
