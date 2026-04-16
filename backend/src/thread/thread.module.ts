import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { WebThreadController, ApiThreadController } from './thread.controller';
import { ThreadRepository } from './thread.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [
    ThreadService,
    ThreadRepository
  ],
  controllers: [
    WebThreadController,
    ApiThreadController
  ],
})
export class ThreadModule {}
