import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]), // Registra a entidade Products
  ],
  controllers: [ProductsController],
  providers: [ProductsService], // Remove os productsProviders
  exports: [ProductsService], // Exporta o service se for usado por outros módulos
})
export class ProductsModule {}
