import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class createProduct {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

@InputType()
export class updateProduct {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

@InputType()
export class productId {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;
}

@InputType()
export class ownerId {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;
}
