import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductDTO {
  @Field()
  _id?: string;

  @Field()
  title: string;

  @Field()
  ownerId: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class UserDTO {
  @Field()
  _id: string;
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
