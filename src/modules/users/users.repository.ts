import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IGenericRepository } from '../../shared/base/interfaces/base-repository.interface';

@Injectable()
export class UsersRepository implements IGenericRepository<User> {
  async create(createUserDto: CreateUserDto): Promise<User> {
    return;
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findByEmail(email: string): Promise<User> {
    return;
    // return await this.prismaService.$queryRaw(
    //   Prisma.sql`SELECT email FROM user WHERE email = ${email}`,
    // );
  }

  async findOne(id: number): Promise<User> {
    // return await this.prismaService.$queryRaw(
    //   Prisma.sql`SELECT id FROM user WHERE id = ${id}`,
    // );
    return;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return;
  }

  remove(id: number): Promise<User> {
    return;
  }
}
