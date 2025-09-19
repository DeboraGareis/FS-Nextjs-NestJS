import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: LoginDto,
  ) {
    return this.authService.signIn(signInDto.email, signInDto.password, res);
  }

  @Get('/me')
  async datosUtiles(@Req() req: Request) {
    return await this.authService.datosUtiles(req);
  }

  @Delete('login')
  async cerrarSesion(@Res({ passthrough: true }) res: Response) {
    return await this.authService.cerrarSesion(res);
  }
}
