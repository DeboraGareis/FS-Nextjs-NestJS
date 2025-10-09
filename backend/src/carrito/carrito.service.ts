import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CrearCarritoDto } from './dto/crear-carrito.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundError } from 'rxjs';
import { ActualizarCarritoDto } from './dto/actualizar-carrito.dto';

@Injectable()
export class CarritoService {
  constructor(private readonly prismaService: PrismaService) {}

  async crearCarrito(crearCarritoDto: CrearCarritoDto) {
    try {
      const { fecha, total, id_usuario } = crearCarritoDto;

      const nuevoCarrito = await this.prismaService.carrito.create({
        data: {
          fecha,
          total,
          usuario: {
            connect: { id: id_usuario },
          },
        },
      });

      return nuevoCarrito;
    } catch (error) {
      console.log(error);

      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async listaDeCarrito() {
    try {
      return this.prismaService.carrito.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async buscarIdCarrito(id: string) {
    try {
      return await this.prismaService.carrito.findUnique({
        where: { id: id },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async actualizarIdCarrito(
    id: string,
    actualizarCarritoDto: ActualizarCarritoDto,
  ) {
    try {
      const { fecha, total, id_usuario } = actualizarCarritoDto;

      const data: any = {};
      if (fecha !== undefined) data.fecha = fecha;
      if (total !== undefined) data.total = total;
      if (id_usuario !== undefined) data.id_usuario = id_usuario;

      const detalleCarritoActualizado = await this.prismaService.carrito.update(
        {
          where: { id: id },
          data: data,
        },
      );
      return detalleCarritoActualizado;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async eliminarIdDeCarrito(id: string) {
    try {
      return await this.prismaService.carrito.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
