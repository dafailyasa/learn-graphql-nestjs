import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { RabitmqModule } from './rabitmq/rabitmq.module';
import config from './configuration/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),

    // mongo connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('mongodb.uri'),
          connectTimeoutMS: configService.get('mongodb.connectionTimeout'),
          socketTimeoutMS: configService.get('mongodb.socketTimeout'),
          autoIndex: true,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
      },
    }),

    // graphql config
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        debug: configService.get('graphql.debug'),
        playground: configService.get('graphql.playground'),
        logger: configService.get('graphql.playground'),
      }),
      inject: [ConfigService],
    }),
    ProductModule,
    RabitmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
