import {
  IsString,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DireccionDto } from './direccion.dto ';
import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
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
