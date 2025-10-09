import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CarritoService } from 'src/carrito/carrito.service';
import { PrismaService } from 'src/prisma.service';
import { ProductoService } from 'src/producto/producto.service';

@Injectable()
export class DetalleOrdenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productoService: ProductoService,
    private readonly carritoService: CarritoService,
  ) {}

  async crearDetalleOrden(crearDetalleOrden) {
    try {
      const { cantidad, id_carrito, id_producto, precio } = crearDetalleOrden;

      await this.productoService.buscarIdProducto(id_producto);
      await this.carritoService.buscarIdCarrito(id_carrito);
      const nuevoDetalleOrden = await this.prismaService.detalleOrden.create({
        data: {
          cantidad,
          producto: {
            connect: { id: id_producto },
          },
          carrito: {
            connect: { id: id_carrito },
          },
          precio,
        },
      });

      return nuevoDetalleOrden;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async listaDetallesDeOrden() {
    try {
      return this.prismaService.detalleOrden.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async buscarIdDetalleDeOrden(id: string) {
    try {
      const detalleOrden = await this.prismaService.detalleOrden.findUnique({
        where: { id: id },
      });
      if (!detalleOrden?.id) {
        throw new NotFoundException();
      }
      return detalleOrden;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async buscarIdCarrito(id: string) {
    try {
      const detallesOrden = await this.prismaService.detalleOrden.findMany({
        where: { id_carrito: id },
      });
      if (detallesOrden.length === 0) {
        throw new NotFoundException('Id de carrito no encontrado.');
      }
      return detallesOrden;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async actualizarIdDetalleDeOrden(id: string, actualizarDetalleOrdenDto) {
    try {
      const { cantidad, id_carrito, id_producto, precio } =
        actualizarDetalleOrdenDto;
      const data: any = {};
      if (cantidad !== undefined) data.cantidad = cantidad;
      if (id_carrito !== undefined) data.id_carrito = id_carrito;
      if (id_producto !== undefined) data.id_producto = id_producto;
      if (precio !== undefined) data.precio = precio;

      const detalleOrdenActualizado =
        await this.prismaService.detalleOrden.update({
          where: { id: id },
          data: data,
        });
      return detalleOrdenActualizado;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw new InternalServerErrorException(error);
    }
  }
  async eliminarIdDetalleDeOrden(id: string) {
    try {
      await this.prismaService.detalleOrden.delete({
        where: { id: id },
      });
      return { message: 'Detalle de orden eliminado' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw new InternalServerErrorException();
    }
  }
}
