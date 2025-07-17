import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MensajeService } from './mensaje.service';
import { MensajeController } from './mensaje.controller';

@Module({
  controllers: [MensajeController],
  providers: [MensajeService, PrismaService],
})
export class MensajeModule {}
