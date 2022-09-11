import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './dto/product.dto';
import { createProduct, updateProduct } from './inputes/products.input';
import { ProductModel, productProp } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name) private productModel: Model<ProductModel>,
  ) {}

  async create(product: createProduct, user: UserDTO): Promise<productProp> {
    if (!user?._id) {
      return;
    }

    Object.assign(product, { ownerId: user._id });
    const res = await this.productModel.create(product);
    return res;
  }

  async update(product: updateProduct, user: UserDTO): Promise<productProp> {
    const payload = {
      title: product.title,
      ownerId: user._id,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
    };

    const res = await this.productModel.findOneAndUpdate(
      { _id: product.id },
      { $set: payload },
      { upsert: true },
    );
    return res;
  }

  async findByOwnerId(id: string): Promise<productProp[]> {
    const products = await this.productModel.find({ ownerId: id }).exec();
    return products;
  }

  async findById(id: string): Promise<productProp> {
    const product = await this.productModel.findOne({ _id: id });
    return product;
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.productModel.deleteOne({ _id: id });
    return res.acknowledged === true ? true : false;
  }
  async findAll() {
    return await this.productModel.find().exec();
  }
}
