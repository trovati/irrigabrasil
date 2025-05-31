import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductsModule } from './products/products.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UsuarioModule, ProductsModule, PedidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
