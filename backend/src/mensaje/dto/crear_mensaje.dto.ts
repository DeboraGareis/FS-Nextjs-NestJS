import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CrearMensajeDto {
  @ApiProperty({ description: 'Id del emisor' })
  @IsString()
  @IsNotEmpty()
  idEmisor: string;

  @ApiProperty({ description: 'Id del receptor' })
  @IsString()
  @IsNotEmpty()
  idReceptor: string;

  @ApiProperty({ description: 'contenido del mensaje' })
  @IsString()
  @IsNotEmpty()
  texto: string;

  @ApiProperty({ description: 'mensaje leido' })
  @IsString()
  @IsNotEmpty()
  leido: siOrNo;
}

enum siOrNo {
  si = 'si',
  no = 'no',
}
