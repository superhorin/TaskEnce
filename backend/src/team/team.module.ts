import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';
import { AuthModule } from 'src/auth/auth.module';
import { WebTeamController, ApiTeamController } from './team.controller';

@Module({
  imports: [AuthModule],
  controllers: [WebTeamController, ApiTeamController],
  providers: [
    TeamService,
    TeamRepository,
  ],
})
export class TeamModule {}
