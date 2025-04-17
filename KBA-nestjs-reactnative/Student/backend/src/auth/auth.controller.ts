import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
    async login(@Body() body: any,@Res({ passthrough: true }) response: Response,) 
    {
      console.log('Received login request:', body); // ✅
      const { username, password } = body;
      const token = await this.authService.login(username, password);
      response.cookie('jwt', token.accessToken, 
      {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return { message: 'Login successful' }; 
    }

@Post('logout')
async logout(@Res({ passthrough: true }) response: Response) {
  response.clearCookie('jwt');
  return { message: 'Logout successful' };
}
}
