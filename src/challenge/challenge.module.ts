import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule {}
