import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { PrismaService } from 'src/prisma.service';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { UploadApiResponse, v2 } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class ProductoService {
  constructor(private readonly prismaService: PrismaService) {}

  async crearProducto(crearProductoDto: CrearProductoDto, imagen: string) {
    try {
      const productoNuevo = await this.prismaService.producto.create({
        data: {
          categoria: crearProductoDto.categoria,
          nombre: crearProductoDto.nombre,
          stock: Number(crearProductoDto.stock),
          imagen: imagen,
          precio: Number(crearProductoDto.precio),
          idAdministrador: crearProductoDto.idAdministrador,
        },
      });
      return productoNuevo;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result: UploadApiResponse) => {
          if (error) {
            reject(
              new InternalServerErrorException('Error al subir la imagen'),
            );
          } else {
            resolve(result);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async listaDeProducto() {
    try {
      return await this.prismaService.producto.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }

  async buscarIdProducto(id: string) {
    try {
      return await this.prismaService.producto.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontró el producto con id: ${id}`);
      }
      throw new InternalServerErrorException(
        'Error al buscar el producto por ID',
      );
    }
  }

  async buscarProductoPorNombre(nombre: string) {
    try {
      const producto = await this.prismaService.producto.findMany({
        where: {
          nombre: { contains: nombre, mode: 'insensitive', startsWith: nombre },
        },
      });
      if (producto.length === 0) {
        throw new NotFoundException('No hay resultados para tu busqueda');
      }
      return producto;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al buscar el producto por nombre',
      );
    }
  }

  async actualizarIdProducto(
    id: string,
    actualizarProductoDto: ActualizarProductoDto,
  ) {
    try {
      const { categoria, imagen, precio, nombre, stock } =
        actualizarProductoDto;
      const data: any = {};
      if (categoria !== undefined) data.categoria = categoria;
      if (imagen !== undefined) data.imagen = imagen;
      if (precio !== undefined) data.precio = Number(precio);
      if (nombre !== undefined) data.nombre = nombre;
      if (stock !== undefined) data.stock = Number(stock);

      const productoActualizado = await this.prismaService.producto.update({
        where: { id: id },
        data: data,
      });
      return productoActualizado;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontró el producto con id: ${id}`);
      }
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  async eliminarIdProducto(id: string) {
    try {
      return await this.prismaService.producto.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma: registro no encontrado
        throw new NotFoundException(`No se encontró el producto con id: ${id}`);
      }
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }

  async verProductoSegunAdministrador(id: string) {
    try {
      const productos = await this.prismaService.producto.findMany({
        where: { idAdministrador: { in: [id] } },
        select: {
          id: true,
          categoria: true,
          nombre: true,
          stock: true,
          imagen: true,
          precio: true,
        },
      });
      if (productos.length === 0) {
        throw new NotFoundException(
          `No se encontraron productos con él: ${id}`,
        );
      }
      return productos;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al conseguir el producto');
    }
  }
}
