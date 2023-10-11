import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Supplier } from './interfaces/supplier';
import { DuplicateSupplierException } from './exceptions/DuplicateSupplierException';

@Injectable()
export class SupplierService {
  private readonly dbFile = path.resolve(__dirname, '../../bd.json'); // Ruta al archivo db.json

  /**
   * Lee los provvedores desde el archivo db.json en el directorio raiza del proyecto
   * @returns Supplier[]
   */

  create(createSupplierDto: CreateSupplierDto): Supplier {
    console.log('create: ', createSupplierDto);
    const data = JSON.parse(fs.readFileSync(this.dbFile, 'utf-8'));

    // Validar que no haya un proveedor con el mismo nombre
    if (data.proveedores.some((p) => p.nombre === createSupplierDto.nombre)) {
      throw new DuplicateSupplierException(createSupplierDto.nombre);
    }

    // Calcular el id basado en la cantidad de registros existentes actualmente
    const nextId = data.proveedores.length + 1;

    const newSupplier: Supplier = {
      id: nextId,
      ...createSupplierDto,
    };

    data.proveedores.push(newSupplier);
    fs.writeFileSync(this.dbFile, JSON.stringify(data, null, 2));
    return newSupplier;
  }

  findAll(page: number, pageSize: number) {
    const data = JSON.parse(fs.readFileSync(this.dbFile, 'utf-8'));
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.proveedores.slice(startIndex, endIndex);
  }

  findOne(id: number): Supplier {
    const data = JSON.parse(fs.readFileSync(this.dbFile, 'utf-8'));
    const supplier: Supplier = data.proveedores.find(
      (supplier) => supplier.id === id,
    );

    return supplier;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    console.log('update', id, updateSupplierDto);
    const data = JSON.parse(fs.readFileSync(this.dbFile, 'utf-8'));
    const index = data.proveedores.findIndex(
      (supplier: Supplier) => supplier.id === id,
    );
    if (index !== -1) {
      const { nombre } = data.proveedores[index];
      console.log('nombre', nombre, updateSupplierDto.nombre);
      if (
        updateSupplierDto.nombre !== undefined &&
        nombre !== updateSupplierDto.nombre
      ) {
        throw new BadRequestException(
          'No se puede modificar el campo "nombre" del proveedor',
        );
      }
      const newSupplier: Supplier = {
        id,
        nombre,
        ...updateSupplierDto,
      };
      data.proveedores[index] = newSupplier;
      fs.writeFileSync(this.dbFile, JSON.stringify(data, null, 2));
      return newSupplier;
    } else {
      throw new BadRequestException('Proveedor no encontrado');
    }
  }

  remove(id: number) {
    const data = JSON.parse(fs.readFileSync(this.dbFile, 'utf-8'));
    const index = data.proveedores.findIndex((p) => p.id === id);
    if (index !== -1) {
      const deletedProveedor = data.proveedores.splice(index, 1)[0];
      fs.writeFileSync(this.dbFile, JSON.stringify(data, null, 2));
      return deletedProveedor;
    } else {
      throw new NotFoundException('Proveedor no encontrado');
    }
  }
}
