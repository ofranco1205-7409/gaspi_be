import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateSupplierException extends HttpException {
  constructor(nombre: string) {
    super(
      `El proveedor con el nombre ${nombre} ya existe.`,
      HttpStatus.CONFLICT,
    );
  }
}
