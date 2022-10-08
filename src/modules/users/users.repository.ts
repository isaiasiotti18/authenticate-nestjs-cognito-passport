import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IGenericRepository } from '../../shared/base/interfaces/base-repository.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository implements IGenericRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, hash_password } = createUserDto;
    const user = this.usersRepository.create({
      email,
      name,
      hash_password,
    });

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({
      email,
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return;
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete({
      id,
    });
  }
}
