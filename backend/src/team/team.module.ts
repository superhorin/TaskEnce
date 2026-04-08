import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TeamController],
  providers: [
    TeamService,
    TeamRepository,
  ],
})
export class TeamModule {}
