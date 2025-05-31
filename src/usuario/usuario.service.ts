import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuarioCadastrarDto } from './dto/usuario.create.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(clientName: string): Promise<any> {
    const client = this.usuarioRepository.find({ where: { name: clientName } });
    return client;
  }

  async create(data: UsuarioCadastrarDto): Promise<Usuario> {
    try {
      const clientName = data.name;
      if (!clientName) {
        throw new HttpException('Cliente já existe', HttpStatus.CONFLICT);
      }
      const usuario = await this.usuarioRepository.create({
        name: data.name,
        email: data.email,
        endereco: data.endereco,
        telefone: data.telefone,
        cep: data.cep,
        cidade: data.cidade,
        bairro: data.bairro,
        ie: data.ie,
        cnpj: data.cnpj,
      });

      await this.usuarioRepository.save(usuario);
      return usuario;
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
