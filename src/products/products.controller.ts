import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '../entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('findAll')
  async findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }
}
