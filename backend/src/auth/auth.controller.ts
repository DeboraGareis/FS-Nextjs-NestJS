import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
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

  @Get('me/:access_token')
  @ApiParam({ name: 'access_token' })
  async datosUtiles(@Param('access_token') access_token: string) {
    return await this.authService.datosUtiles(access_token);
  }
}
