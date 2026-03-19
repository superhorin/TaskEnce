import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule, TasksModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
<<<<<<< HEAD
      expandVariables: true,
=======
>>>>>>> 75961c6 (fix: jwt secret)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
