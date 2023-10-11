import { ConsoleLogger, Module } from '@nestjs/common';
import { SupplierModule } from './supplier/supplier.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), SupplierModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(process.env);
  }
}
