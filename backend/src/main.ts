import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const origins = configService.get<string>('ALLOWED_ORIGINS')?.split(',') || ['http://localhost:5173'];
  const port = configService.get<number>('BACKEND_PORT') || 3003;

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('タスク管理APIの仕様書')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port, '127.0.0.1');
}
bootstrap();
