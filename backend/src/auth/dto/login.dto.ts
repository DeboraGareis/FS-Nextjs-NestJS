import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'mail del usuario',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'contraseña del usuario',
  })
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}

export class TokenDto {
  @ApiProperty({
    description: 'token',
  })
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
