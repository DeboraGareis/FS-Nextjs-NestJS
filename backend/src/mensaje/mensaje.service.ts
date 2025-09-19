import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MensajeService {
  constructor(private readonly prismaService: PrismaService) {}
  async crearMensajeService(crearMensajeDto) {
    try {
      const { idEmisor, idReceptor, texto, leido } = crearMensajeDto;
      const date = new Date().toISOString();
      //console.log('date date unicamente con este tipo de new Date(): ', date); //2025-07-17T14:45:13.800Z:
      const mensaje = await this.prismaService.mensajes.create({
        data: {
          idEmisor: crearMensajeDto.idEmisor,
          idReceptor: crearMensajeDto.idReceptor,
          texto: crearMensajeDto.texto,
          fechaHora: String(date),
          leido: crearMensajeDto.leido,
        },
      });
      //console.log('dato de la base de dato:', mensaje.fechaHora); //Thu Jul 17 2025 11:45:13 GMT-0300 (hora estándar de Argentina)
      return mensaje;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async conseguirMensajeService(idEmisor, idReceptor) {
    try {
      const mensaje = await this.prismaService.mensajes.findMany({
        where: {
          OR: [
            {
              idEmisor: { in: [idEmisor] },
              idReceptor: { in: [idReceptor] },
            },
            {
              idEmisor: { in: [idReceptor] },
              idReceptor: { in: [idEmisor] },
            },
          ],
        },
        orderBy: {
          fechaHora: 'asc',
        },
      });
      if (mensaje.length === 0) {
        throw new NotFoundException('No so encontraron mensajes');
      }
      return mensaje;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async listaDeMensajes() {
    try {
      return await this.prismaService.mensajes.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los mensajes');
    }
  }
}
