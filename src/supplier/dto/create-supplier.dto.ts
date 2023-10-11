import {
  IsString,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DireccionDto } from './direccion.dto ';

export class CreateSupplierDto {
  @IsString()
  nombre: string;

  @IsString()
  razon_social: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DireccionDto)
  direccion: DireccionDto;

  @IsOptional()
  @IsString()
  notas: string;
}
