import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, TokenDto } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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

  @Post('me')
  @ApiBody({ type: TokenDto })
  async datosUtiles(@Body() body: TokenDto) {
    return await this.authService.datosUtiles(body.access_token);
  }
}
