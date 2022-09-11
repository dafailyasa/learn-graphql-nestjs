import { ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductDTO, UserDTO } from './dto/product.dto';
import {
  createProduct,
  ownerId,
  productId,
  updateProduct,
} from './inputes/products.input';
import { ProductService } from './product.service';

import { ForbiddenError } from 'apollo-server-express';
import { CurrentUser } from 'src/common/helper/current-user.decorator';
import { RabitmqService } from 'src/rabitmq/rabitmq.service';

@Resolver()
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private rabitmq: RabitmqService,
  ) {}

  @Mutation(() => ProductDTO)
  async createProduct(
    @Args('input', new ValidationPipe({ transform: true }))
    input: createProduct,
    @CurrentUser() user: UserDTO,
  ) {
    this.checkRole(user);
    try {
      const res = await this.productService.create(input, user);
      return res;
    } catch (error) {
      throw error;
    }
  }

  @Query(() => [ProductDTO])
  async products() {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Query(() => [ProductDTO])
  async findProductsByOwnerId(
    @Args('input', new ValidationPipe({ transform: true }))
    input: ownerId,
  ) {
    try {
      return await this.productService.findByOwnerId(input.id);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => ProductDTO)
  async findProductById(
    @Args('input', new ValidationPipe({ transform: true })) input: productId,
  ) {
    try {
      return await this.productService.findById(input.id);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => ProductDTO)
  async updateProduct(
    @Args('input', new ValidationPipe({ transform: true }))
    input: updateProduct,
    @CurrentUser() user: UserDTO,
  ) {
    this.checkRole(user);
    try {
      const res = await this.productService.update(input, user);
      return res;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('input', new ValidationPipe({ transform: true }))
    input: productId,
    @CurrentUser() user: UserDTO,
  ) {
    this.checkRole(user);
    try {
      const res = await this.productService.delete(input.id);
      return res;
    } catch (error) {
      throw error;
    }
  }

  private checkRole(user: UserDTO) {
    if (user.role.toLocaleLowerCase() === 'customer') {
      throw new ForbiddenError(
        `User with role ${user.role} can't do perform this action`,
      );
    }
  }
}
