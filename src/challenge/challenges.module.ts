import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChallengeService } from './challenges.service';
import { ChallengeController } from './challenges.controller';
import { ChallengeSchema } from './interfaces/challenge.schema';
import { PlayersModule } from 'players/players.module';
import { CategoriesModule } from 'category/categories.module';

const features = [{ name: 'Challenges', schema: ChallengeSchema }];

@Module({
  imports: [
    MongooseModule.forFeature(features),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengesModule {}
