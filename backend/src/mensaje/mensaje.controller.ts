import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { MensajeService } from './mensaje.service';
import { CrearMensajeDto } from './dto/crear_mensaje.dto';

@ApiTags('Mensaje')
@Controller('mensaje')
export class MensajeController {
  constructor(private readonly mensajeService: MensajeService) {}

  @Post()
  async crearMensaje(@Body() crearMensajeDto: CrearMensajeDto) {
    return await this.mensajeService.crearMensajeService(crearMensajeDto);
  }

  @Get('/:idEmisor/:idReceptor')
  async conseguirMensaje(
    @Param('idEmisor', new ParseUUIDPipe()) idEmisor: string,
    @Param('idReceptor', new ParseUUIDPipe()) idReceptor: string,
  ) {
    return await this.mensajeService.conseguirMensajeService(
      idEmisor,
      idReceptor,
    );
  }
}
