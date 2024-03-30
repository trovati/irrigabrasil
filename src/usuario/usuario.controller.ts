import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDto } from './dto/usuario.create.dto';
import { ResultDto } from 'src/dto/result.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('findAll')
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('findOne/:clientName')
  async findOne(@Param('clientName') clientName: string): Promise<any> {
    return this.usuarioService.findOne(clientName);
  }

  @Post('cadastrar')
  async create(@Body() data: UsuarioCadastrarDto): Promise<ResultDto> {
    return this.usuarioService.create(data);
  }
}
