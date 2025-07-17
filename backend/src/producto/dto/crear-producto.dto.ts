import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CrearProductoDto {
  @ApiProperty({ description: 'ID de categoria' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Cantidad o Stock del producto' })
  @IsString()
  @IsNotEmpty()
  stock: string;

  @ApiProperty({ description: 'idAdministrador ' })
  @IsString()
  @IsNotEmpty()
  idAdministrador: string;

  // @ApiProperty({ description: 'Imagen del producto' })
  // @IsString()
  // @IsNotEmpty()
  // imagen: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsString()
  @IsNotEmpty()
  precio: string;
}

export const CrearProductoSwaggerSchema = {
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
      categoria: { type: 'string', example: '123' },
      nombre: { type: 'string', example: 'Producto 1' },
      stock: { type: 'string', example: '50' },
      precio: { type: 'string', example: '199.99' },
    },
    required: ['file', 'categoria', 'nombre', 'stock', 'precio'],
  },
};
