import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CrearDetalleOrdenDto } from './crear-detalle-orden.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ActualizarDetalleOrdenDto extends PartialType(
  CrearDetalleOrdenDto,
) {
  @ApiProperty({
    description: 'OPCIONAL-Cantidad del total del detalle de orden',
  })
  @IsOptional()
  @IsString()
  cantidad?: string;

  @ApiProperty({
    description: 'OPCIONAL-ID del producto',
  })
  @IsOptional()
  @IsUUID()
  id_producto?: string;

  @ApiProperty({
    description: 'OPCIONAL-ID del carrito',
  })
  @IsOptional()
  @IsUUID()
  id_carrito?: string;
}
