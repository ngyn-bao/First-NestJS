import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// nest g module modules/user ==> tạo module user
// nest g controller modules/user ==> tạo controller user
// nest g service modules/user ==> tạo service user
