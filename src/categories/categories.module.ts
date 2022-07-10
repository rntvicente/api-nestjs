import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PlayersService } from '../players/players.service';
import { CategorySchema } from './interfaces/categories.schema';
import { PlayersSchema } from '../players/interfaces/players.schema';

const features = [
  { name: 'Categories', schema: CategorySchema },
  { name: 'Players', schema: PlayersSchema },
];

@Module({
  imports: [MongooseModule.forFeature(features)],
  controllers: [CategoriesController],
  providers: [CategoriesService, PlayersService],
})
export class CategoriesModule {}
