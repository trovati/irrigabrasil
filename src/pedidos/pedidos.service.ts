import { ProductGroup } from '../entities/productGroup.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { requestEntity } from '../entities/pedidos.entity';
import { Repository } from 'typeorm';
import { Products } from 'src/entities/products.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { ProductGroupMembers } from 'src/entities/productGroupMembers.entity';
import { payloadRequest } from './dto/result.dto';
import { TemplateData } from 'src/common/interface/pdfData.interface';
import { generatePDF } from 'src/common/generatePdf';
import { paymentEntity } from 'src/entities/payment.entity';
@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(requestEntity)
    private readonly pedidosRepository: Repository<requestEntity>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(ProductGroup)
    private readonly productGroupRepository: Repository<ProductGroup>,
    @InjectRepository(ProductGroupMembers)
    private readonly productGroupMembersRepository: Repository<ProductGroupMembers>,
    @InjectRepository(paymentEntity)
    private readonly paymentRepository: Repository<paymentEntity>,
  ) {}

  async findAll() {
    return this.pedidosRepository.find();
  }

  async payments() {
    try {
      const payments = await this.paymentRepository.find();

      return payments;
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        (error as HttpException).getStatus
          ? (error as HttpException).getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(idPedido: number) {
    const pedido = await this.pedidosRepository.findOne({
      where: { id: idPedido },
    });

    return pedido;
  }

  async create(payload: payloadRequest) {
    try {
      const cliente = await this.usuarioRepository.findOne({
        where: { id: payload.client },
      });

      if (!cliente) {
        throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
      }

      const createProductGroup = await this.productGroupRepository.create({
        productName: cliente.name,
      });
      const productGroup =
        await this.productGroupRepository.save(createProductGroup);

      if (payload.products.length === 0) {
        throw new HttpException('Pedido sem produto', HttpStatus.BAD_REQUEST);
      }

      let totalRequest = 0;
      const produtos = [];
      const productsPdf = [];
      for (let p of payload.products) {
        const findProduct = await this.productsRepository.findOne({
          where: { id: p.idProduct, isDeleted: false },
        });

        if (!findProduct) {
          throw new HttpException(
            'Cliente não encontrado',
            HttpStatus.NOT_FOUND,
          );
        }

        const totalPerProduct = p.quantity * p.valuePerProduct;

        totalRequest = totalRequest + +totalPerProduct.toFixed(2);
        const createProductGroupMembers =
          await this.productGroupMembersRepository.create({
            idProduct: p.idProduct,
            idProductGroup: productGroup.id,
            quantity: p.quantity,
            valuePerProduct: p.valuePerProduct,
            totalPerProduct: +totalPerProduct.toFixed(2),
          });

        await this.productGroupMembersRepository.save(
          createProductGroupMembers,
        );
        const products = {
          id: findProduct.id,
          description: findProduct.productName,
          quantity: p.quantity,
          valuePerProduct: p.valuePerProduct,
          totalPerProduct: +totalPerProduct.toFixed(2),
        };
        produtos.push(products);
        const productsFormattedPdf = {
          id: findProduct.id,
          description: findProduct.productName,
          quantity: p.quantity,
          valuePerProduct: p.valuePerProduct.toLocaleString('pt-BR', {
            // Opcional: versão formatada
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          }),
          totalPerProduct: totalPerProduct.toLocaleString('pt-BR', {
            // Opcional: versão formatada
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        };
        productsPdf.push(productsFormattedPdf);
      }
      const today = new Date().toLocaleString('pt-BR');
      const match = today.match(/^(\d{2})\/(\d{2})\/(\d{4})/);

      const requestProtocol = match ? `${match[3]}${match[2]}${match[1]}` : '';
      let countId = 1;

      const findRequestProtocol = await this.pedidosRepository.find({
        where: { isDeleted: false },
      });

      if (findRequestProtocol.length > 0) {
        countId = countId + findRequestProtocol.length;
      }
      const createRequest = await this.pedidosRepository.create({
        idProductGroup: productGroup.id,
        idClient: cliente.id,
        idpayment: payload.payment,
        total: +totalRequest.toFixed(2),
        requestprotocol: requestProtocol + `${countId}`,
      });

      await this.pedidosRepository.save(createRequest);
      const findPayment = await this.paymentRepository.findOne({
        where: { idPayment: payload.payment },
      });
      const requestPdf: TemplateData = {
        client: cliente,
        produtos: productsPdf,
        requestProtocol,
        totalRequest: totalRequest.toLocaleString('pt-BR', {
          // Opcional: versão formatada
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        dateRequest: today,
        payment: findPayment.method,
      };
      await generatePDF(requestPdf);
      return requestPdf;
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

  async update(payload: payloadRequest) {
    try {
      const cliente = await this.usuarioRepository.findOne({
        where: { id: payload.client },
      });

      if (!cliente) {
        throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
      }

      const createProductGroup = await this.productGroupRepository.create({
        productName: cliente.name,
      });
      const productGroup =
        await this.productGroupRepository.save(createProductGroup);

      if (payload.products.length === 0) {
        throw new HttpException('Pedido sem produto', HttpStatus.BAD_REQUEST);
      }

      let totalRequest = 0;

      for (let p of payload.products) {
        const findProduct = await this.productsRepository.findOne({
          where: { id: p.idProduct, isDeleted: false },
        });

        if (!findProduct) {
          throw new HttpException(
            'Cliente não encontrado',
            HttpStatus.NOT_FOUND,
          );
        }

        const totalPerProduct = p.quantity * p.valuePerProduct;

        totalRequest = totalRequest + totalPerProduct;
        const createProductGroupMembers =
          await this.productGroupMembersRepository.create({
            idProduct: p.idProduct,
            idProductGroup: productGroup.id,
            quantity: p.quantity,
            valuePerProduct: p.valuePerProduct,
            totalPerProduct,
          });

        await this.productGroupMembersRepository.save(
          createProductGroupMembers,
        );
      }

      const createRequest = await this.pedidosRepository.create({
        idProductGroup: productGroup.id,
        idClient: cliente.id,
        idpayment: payload.payment,
        total: totalRequest,
      });

      await this.pedidosRepository.save(createRequest);
      return createRequest;
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
