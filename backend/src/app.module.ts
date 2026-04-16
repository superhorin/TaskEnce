import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { ThreadModule } from './thread/thread.module';

@Module({
  imports: [
    PrismaModule, TasksModule, AuthModule, TeamModule, ThreadModule, RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
