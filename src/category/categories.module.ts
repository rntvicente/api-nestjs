import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './interfaces/categories.schema';
import { PlayersModule } from 'players/players.module';

const features = [{ name: 'Categories', schema: CategorySchema }];
@Module({
  imports: [MongooseModule.forFeature(features), PlayersModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
