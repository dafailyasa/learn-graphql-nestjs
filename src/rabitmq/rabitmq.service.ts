import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabitmqService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  publish(topicName: string, data: Record<string, any>) {
    const payload: Buffer = Buffer.from(JSON.stringify(data));
    this.client.emit(topicName, payload);
  }
}
