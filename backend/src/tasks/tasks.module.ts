import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { AuthModule } from 'src/auth/auth.module';
import { WebTasksController, ApiTasksController } from './tasks.controller';

@Module({
  imports: [AuthModule],
  controllers: [WebTasksController, ApiTasksController],
  providers: [
    TasksService,
    TasksRepository,
  ],
})
export class TasksModule {}
