import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface productProp {
  _id: string;
  title: string;
  ownerId: string;
  price: number;
  quantity: number;
  description: string;
}
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'product',
})
export class ProductModel extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  ownerId: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true, default: 0 })
  quantity: number;

  @Prop({ type: String, required: true })
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
