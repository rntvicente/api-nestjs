import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { PlayersSchema } from './interfaces/players.schema';

const features = [{ name: 'Players', schema: PlayersSchema }];

@Module({
  imports: [MongooseModule.forFeature(features)],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
