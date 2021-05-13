import { AuthService } from './auth.service';
import { UserLoginDTO } from './dtos/user-login';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async getAuthToken(@Body() userLoginDto: UserLoginDTO) {
    try {
      return await this.authService.login(userLoginDto);
    } catch (error) {
      throw error;
    }
  }
}
