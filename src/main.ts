import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ALLExceptionsFilter } from './http-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Inventory Api')
    .setDescription('To check inventory')
    .setVersion('1.0')
    .addTag('Inventory')
    .build();

  const documentfactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentfactory, {
    jsonDocumentUrl: '/api-json',
  });

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new ALLExceptionsFilter(httpAdapter));

  await app.listen(PORT, () => {
    console.log(`The Server Port is listening at http:\\localhost:${PORT}`);
  });
}
bootstrap();
