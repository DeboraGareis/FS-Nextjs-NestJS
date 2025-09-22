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
      //?envia el token a una cookie

      await this.cookieAutenticacion(access_token, res);

      return { access_token };
    }
    if (administrador) {
      const isMatch = await bcrypt.compare(pass, administrador?.password);

      if (isMatch !== true) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const payload = { rol: 'administrador', sub: administrador.id };
      const access_token = await this.jwtService.signAsync(payload);
      //?envia el token a una cookie
      await this.cookieAutenticacion(access_token, res);
      return { access_token };
    }
  }
  //*metodo que envia el token al navegador, y lo guarda en una cookie*//
  async cookieAutenticacion(token, res: Response) {
    return res.cookie('access_token', token, {
      httpOnly: true,secure: true,sameSite: 'none'
    });
  }

  //*metodo que toma el valor de la cookie y verifica de que el token no sea corrupto y devuelve los datos que contiene por payload *//
  async datosUtiles(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ) {
    const token = req.cookies?.['access_token'];
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

  async cerrarSesion(res: Response<any, Record<string, any>>) {
    res.clearCookie('access_token', {
      httpOnly: true, // mantenelo seguro
      secure: true, // recomendable si usas https
      sameSite: 'none', // ajustá según tu caso 
    });
    return { message: 'Cookie eliminada' };
  }
}
