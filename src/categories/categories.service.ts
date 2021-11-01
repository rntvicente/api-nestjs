import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoriesDto } from './dtos/create-categories.dto';
import { Category } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories')
    private readonly categoriesModel: Model<Category>,
  ) {}

  async CreateCategories({
    category,
    description,
    events,
  }: CreateCategoriesDto): Promise<Category> {
    const currentCategory = await this.categoriesModel
      .findOne({ category })
      .exec();

    if (currentCategory) {
      return currentCategory;
    }

    const current = new this.categoriesModel({ category, description, events });
    return current.save();
  }
}
