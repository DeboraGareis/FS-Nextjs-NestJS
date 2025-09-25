import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import {
  CrearProductoDto,
  CrearProductoSwaggerSchema,
} from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AutenticadorGuard } from 'src/guard/autenticador.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Rol } from 'src/guard/enum';
import { Roles } from 'src/decoradores/roles.decorador';
import { FileInterceptor } from '@nestjs/platform-express';

//@ApiBearerAuth()
//@UseGuards(AutenticadorGuard)
@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  // @Roles(Rol.ADMINISTRADOR, Rol.USUARIO)
  //@UseGuards(RolesGuard)
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file')) // "file" es como espero la imagen
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(CrearProductoSwaggerSchema)
  async crearProducto(
    @UploadedFile() file: Express.Multer.File,
    @Body() crearProductoDto: CrearProductoDto,
  ) {
    if (!file) {
      throw new BadRequestException('La imagen del producto es requerida');
    }
    const imagen = await this.productoService.uploadImage(file);
    return await this.productoService.crearProducto(
      crearProductoDto,
      imagen.url,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Array de objetos de productos de la DB' })
  @ApiResponse({
    status: 200,
    description: 'Lista del total de los productos...',
  })
  async listaDeProducto() {
    return await this.productoService.listaDeProducto();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Conseguir 1 producto por ID de la DB' })
  @ApiParam({ name: 'id', required: true, description: 'El id del producto' })
  async buscarIdProducto(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.productoService.buscarIdProducto(id);
  }

  @Get('nombre/:nombre')
  @ApiOperation({ summary: 'Conseguir 1 producto por Nombre de la DB' })
  @ApiParam({
    name: 'nombre',
    required: true,
    description: 'El nombre del producto',
  })
  async buscarProductoPorNombre(@Param('nombre') nombre: string) {
    return await this.productoService.buscarProductoPorNombre(nombre);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una dato del producto por ID en la DB' })
  @ApiParam({ name: 'id', required: true, description: 'El id del producto' })
  @ApiBody({ type: ActualizarProductoDto })
  async actualizarIdProducto(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() actualizarProductoDto: ActualizarProductoDto,
  ) {
    return await this.productoService.actualizarIdProducto(
      id,
      actualizarProductoDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto por ID de la DB' })
  @ApiParam({ name: 'id', required: true, description: 'El id del producto' })
  async eliminarIdProducto(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.productoService.eliminarIdProducto(id);
  }

  @Get('productos/:idAdministrador')
  @ApiOperation({ summary: 'Productos segun ID de administrador' })
  @ApiParam({
    name: 'idAdministrador',
    required: true,
    description: 'El id del administrador',
  })
  async verProductoSegunAdministrador(
    @Param('idAdministrador', new ParseUUIDPipe()) idAdministrador: string,
  ) {
    return this.productoService.verProductoSegunAdministrador(idAdministrador);
  }
}
