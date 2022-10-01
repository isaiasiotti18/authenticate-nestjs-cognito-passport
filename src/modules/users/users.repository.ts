import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { IGenericRepository } from '../../shared/base/interfaces/base-repository.interface';

@Injectable()
export class UsersRepository implements IGenericRepository<UserEntity> {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return await this.prismaService.user.findUnique({
      where: id,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.prismaService.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
  }

  remove(id: number): Promise<UserEntity> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
