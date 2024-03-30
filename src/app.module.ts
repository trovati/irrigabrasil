import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsuarioModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
