// import { Injectable, Inject } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { ProductGroupMembers } from './productGroupMembers.entity';
// import { UsuarioCadastrarDto } from './dto/usuario.create.dto';
// import { ResultDto } from 'src/dto/result.dto';
// import { Products } from 'src/products/products.entity';
// import { ProductGroupMembersCadastrarDto } from './dto/productGroupMembers.create.dto';

// @Injectable()
// export class ProductGroupMembersService {
//   constructor(
//     @Inject('PRODUCTGROUPMEMBERS_REPOSITORY')
//     private productGroupMembersRepository: Repository<ProductGroupMembers>,
//     private productRepository: Repository<Products>,
//   ) {}

//   async findAll(): Promise<ProductGroupMembers[]> {
//     return this.productGroupMembersRepository.find();
//   }

//   async findProduct(productId: number): Promise<any> {
//     const product = this.productRepository.find({
//       where: { id: productId },
//     });
//     return product;
//   }

//   async create(data: ProductGroupMembersCadastrarDto): Promise<any> {
//     try {
//       const hasProduct = data.product;
//       const products = [];

//       if (hasProduct.length) {
//         for (let i = 0; i < hasProduct.length; i++) {
//           const product = this.findProduct(hasProduct);
//           products.push(product);
//         }
//       }

//       const productGroupMembers = new ProductGroupMembers();

//       productGroupMembers.idProductGroup = data.idProductGroup;
//       usuario.email = data.email;
//       usuario.endereco = data.endereco;
//       usuario.telefone = data.telefone;
//       this.usuarioRepository
//         .save(usuario)
//         .then(() => {
//           return <ResultDto>{
//             status: true,
//             mensagem: 'Salvou',
//           };
//         })
//         .catch(() => {
//           return <ResultDto>{
//             status: false,
//             mensagem: 'Error ao cadastrar usuário',
//           };
//         });
//     } catch (error) {
//       throw error;
//     }
//   }
// }
