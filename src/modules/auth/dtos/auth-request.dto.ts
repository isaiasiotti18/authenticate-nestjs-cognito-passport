import { ApiProperty } from '@nestjs/swagger';

export class AuthRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}
