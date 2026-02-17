import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // フロントエンド(http://localhost:5173)からのアクセスを許可
  app.enableCors({
    origin: 'http://localhost:5173', 
  });

  await app.listen(3000);
}
bootstrap();
