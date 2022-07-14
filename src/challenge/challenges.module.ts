import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ChallengeService } from './challenges.service'
import { ChallengesController } from './challenges.controller'
import { ChallengesSchema } from './interfaces/challenges.schema'
import { PlayersModule } from 'players/players.module'
import { CategoriesModule } from 'category/categories.module'

const features = [{ name: 'Challenges', schema: ChallengesSchema }]

@Module({
  imports: [
    MongooseModule.forFeature(features),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengeService],
})
export class ChallengesModule {}
