import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductModel, ProductSchema } from './product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RabitmqModule } from 'src/rabitmq/rabitmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
    RabitmqModule,
  ],
  providers: [ProductService, ProductResolver, AuthGuard],
  exports: [ProductService],
})
export class ProductModule {}
