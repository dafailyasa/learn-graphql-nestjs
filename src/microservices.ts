import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const bootMicroservice = async (app: INestApplication) => {
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('rabbitmq.urls')],
      queue: configService.get<string>('rabbitmq.queueName'),
      queueOptions: {
        durable: true,
      },
    },
  });
};
