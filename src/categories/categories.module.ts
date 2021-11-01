import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './interfaces/categories.schema';

const features = [{ name: 'Categories', schema: CategorySchema }];

@Module({
  imports: [MongooseModule.forFeature(features)],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
