import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, whitelist: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cyber Media NodeJS')
    .setDescription('Docs OpenAPI')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// nest g module modules/user ==> tạo module user
// nest g controller modules/user ==> tạo controller user
// nest g service modules/user ==> tạo service user

// nest g resource modules/user ==> tạo nhanh resource
