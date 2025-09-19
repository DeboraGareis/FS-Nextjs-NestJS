import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MensajeService } from './mensaje.service';
import { MensajeController } from './mensaje.controller';
import { MensajesGateway } from './mensajes.gateway';

@Module({
  controllers: [MensajeController],
  providers: [MensajeService, PrismaService, MensajesGateway],
})
export class MensajeModule {}
