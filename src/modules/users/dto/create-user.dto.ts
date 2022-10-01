import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  email: string;
  name: string;
  hash_password: string;
}
