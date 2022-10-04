import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty()
  hash_password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
