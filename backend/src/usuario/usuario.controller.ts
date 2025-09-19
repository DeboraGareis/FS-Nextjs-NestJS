import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuario, UpdateMail } from './dto/crear_usuario.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AutenticadorGuard } from 'src/guard/autenticador.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  

  @Post()
    @ApiOperation({ summary: 'Crear usuario' })
    @ApiBody({ type: CreateUsuario })
  async create(@Body() crearUsuarioDto: CreateUsuario) {
    return await this.usuarioService.create(crearUsuarioDto);
  }


 @Get()
  //@UseGuards(AutenticadorGuard)
  //@ApiBearerAuth()
  @ApiOperation({ summary: 'Array de usuarios de la DB' })
  @ApiQuery({ name: 'page', required: true, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, example: 10 })
  getAllList(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.usuarioService.getAllList({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    });
  }
 
  @Get('sellers/')
  //@UseGuards(AutenticadorGuard)
  //@ApiBearerAuth()
  @ApiOperation({ summary: 'Array de usuarios vendedores de la DB' })
  @ApiQuery({ name: 'page', required: true, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, example: 10 })
  getAllSellerList(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.usuarioService.getAllSellerList({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    });
  }

  @Get(':id')
    @ApiOperation({summary: 'Obtiene un usuario de la DB segun su ID'})
    @ApiParam({
      name: 'id',
      required: true,
      description: 'El id del usuario a obtener',
    })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usuarioService.getById(id);
  }


  @Put(':id')
  @ApiOperation({summary: 'Actualiza el mail de un usuario de la DB segun su ID' })
  @ApiParam({
      name: 'id',
      required: true,
      description: 'El id del usuario al que actualizamos su mail',
    })
  @ApiBody({ type: UpdateMail })
  updateMailById(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateMail: UpdateMail) {
    return this.usuarioService.updateMailById(id, updateMail.email);
  }


  @Delete(':id')
    @ApiOperation({summary: 'Eliminar usuario por ID de la DB' })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'El id del usuario a eliminar',
    })
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usuarioService.deleteById(id);
  }
}
