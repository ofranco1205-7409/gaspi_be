import { IsString, IsNotEmpty } from 'class-validator';
export class DireccionDto {
  @IsString()
  calle: string;

  @IsNotEmpty()
  numero: number;

  @IsString()
  ciudad: string;

  @IsString()
  estado: string;

  @IsString()
  zip: string;

  @IsString()
  pais: string;
}
