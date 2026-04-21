import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const origins = configService.get<string>('ALLOWED_ORIGINS')?.split(',') || ['http://localhost:5173'];
  const port = configService.get<number>('BACKEND_PORT') || 3003;

  app.enableCors({
    origin: origins,
  });

  await app.listen(port);
}
bootstrap();
