import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { productsProviders } from './products.providers';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [...productsProviders, ProductsService],
})
export class ProductsModule {}
