export interface Supplier {
  id: number;
  nombre: string;
  razon_social: string;
  direccion: Direccion;
  notas?: string;
}

export interface Direccion {
  calle: string;
  numero: number;
  ciudad: string;
  estado: string;
  zip: string;
  pais: string;
}
