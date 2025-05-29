import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
// import { ALLExceptionsFilter } from './http-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new ALLExceptionsFilter(httpAdapter));

  await app.listen(PORT, () => {
    console.log(`The Server Port is listening at http:\\localhost:${PORT}`);
  });
}
bootstrap();
