import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './common/guards/auth.guard';
import { bootMicroservice } from './microservices';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['verbose', 'debug', 'log', 'error', 'warn'],
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalGuards(new AuthGuard());
    await app.listen(process.env.PORT || 3000);

    bootMicroservice(app);
    app.startAllMicroservices();
    console.info(`App start on port:${process.env.PORT}`);
  } catch (err) {
    console.error(`Fatal error can't boot application.`, err.message);
    process.exit(1);
  }
}
bootstrap();
