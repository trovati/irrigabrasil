import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async findOne(idProduct: number): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: idProduct },
      });

      return product;
    } catch (error: any) {
      console.error(error);

      throw new HttpException(
        `${error.message}`,
        (error as HttpException).getStatus
          ? (error as HttpException).getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
