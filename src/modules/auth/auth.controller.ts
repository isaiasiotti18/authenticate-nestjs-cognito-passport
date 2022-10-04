import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dtos/auth-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async register(@Body() authRequest: AuthRequestDto) {
    return await this.authService.authenticateUser(authRequest);
  }

  @Post('login')
  async login(@Body() authRequest: AuthRequestDto) {
    return await this.authService.authenticateUser(authRequest);
  }
}
