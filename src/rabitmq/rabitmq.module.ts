import { Module } from '@nestjs/common';
import { RabitmqService } from './rabitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://zsszmmjr:TFaroOCH04W3qGNR2rx47va9uqlAxKU0@eagle.rmq.cloudamqp.com/zsszmmjr',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [RabitmqService],
  exports: [RabitmqService],
})
export class RabitmqModule {}
