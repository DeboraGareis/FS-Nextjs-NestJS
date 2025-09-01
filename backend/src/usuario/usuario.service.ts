import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuario } from './dto/crear_usuario.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUsuarioDto: CreateUsuario) {
    try {
      const { password, email } = createUsuarioDto;
      const emailExiste = await this.getByEmail(email);
      if (!emailExiste) {
        const hashpassword = await bcrypt.hash(password, 10);
        const usuarioNuevo = await this.prismaService.usuario.create({
          data: {
            email: email,
            nombre: createUsuarioDto.nombre,
            password: hashpassword,
          },
        });
        return usuarioNuevo;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('No se pudo crear el usuario');
    }
  }

  getById(id: string) {
    try {
      const user = this.prismaService.usuario.findFirst({ where: { id: id } });
      return user;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontró el usuario con id: ${id}`);
      }
      throw new InternalServerErrorException('Error al buscar el usuario por ID',);
    }
  }

  async getByEmail(email: string) {
    try {
      const emailUser = await this.prismaService.usuario.findFirst({
        where: { email: email },
        select: { email: true },
      });
      if (emailUser?.email === email) {
        throw new ConflictException('Ya se encuentra registrado en nuestra BD');
      }
      return false;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar el usuario por mail');
    }
  }

   async getAllList(params: { page: number; limit: number }) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    try {
      const [usuarios, total] = await this.prismaService.$transaction([
        this.prismaService.usuario.findMany({
          skip, //salto
          take: limit,
          orderBy: { nombre: 'asc' }, 
        }),
        this.prismaService.usuario.count(),
      ]);

      return {
        data: usuarios,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener lista de usuarios');
    }
  }


   async getAllSellerList(params: { page: number; limit: number }) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    try {
      const [usuarios, total] = await this.prismaService.$transaction([
        this.prismaService.usuario.findMany({
          skip,
          take: limit,
          orderBy: { nombre: 'asc' },
          where: {
            activo: true,   //filtro los venderores
          },
        }),
        this.prismaService.usuario.count({
          where: {
            activo: true,   // contar solo los activos
          },
        }),
      ]);

      return {
        data: usuarios,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener lista de vendedores',
      );
    }
  }


  updateMailById(id: string, mail: string) {
    try {
      const user = this.prismaService.usuario.update({
        where: { id: id },
        data: { email: mail },
      });
      return user;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontró el usuario con id: ${id}`);
      }
      throw new InternalServerErrorException('Error al actualizar el mail');
    }
  }

  deleteById(id: string) {
    try {
      const user = this.prismaService.usuario.delete({ where: { id: id } });
      return user;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontró el usuario con id: ${id}`);
      }
      throw new InternalServerErrorException('Error al eliminar usuario');
    }
  }
}
