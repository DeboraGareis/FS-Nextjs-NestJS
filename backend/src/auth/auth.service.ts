import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    mail: string,
    pass: string,
    res: Response,
  ): Promise<{ access_token: string } | undefined> {
    const user = await this.prisma.usuario.findUnique({
      where: { email: mail },
    });
    const administrador = await this.prisma.administrador.findUnique({
      where: { email: mail },
    });

    if (!user && !administrador)
      throw new UnauthorizedException('Credenciales inválidas');

    if (user) {
      const isMatch = await bcrypt.compare(pass, user?.password);
      if (isMatch !== true) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const payload = { rol: 'usuario', sub: user.id };
      const access_token = await this.jwtService.signAsync(payload);
  
      return { access_token };
    }
    if (administrador) {
      const isMatch = await bcrypt.compare(pass, administrador?.password);

      if (isMatch !== true) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const payload = { rol: 'administrador', sub: administrador.id };
      const access_token = await this.jwtService.signAsync(payload);
      return { access_token };
    }
  }
  
  
  async datosUtiles(access_token:string ) {
    const token = access_token
    if (!token) {
      throw new UnauthorizedException('No token found');
    }
    //consulte la BD con el userId para validar estado y traer datos frescos.
    //deberia consultar con la base de datos si los datos son los que dice la DB
    try {
      // Verificás y decodificás el token JWT
      const payload = await this.jwtService.verifyAsync(token);

      // Extraés el id o lo que necesites del payload
      const userId = payload.sub; // o como lo tengas definido

      // Retornás solo lo necesario
      return { userId };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
