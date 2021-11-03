import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoriesDto } from './dtos/create-categories.dto';
import { UpdateCategoriesDto } from './dtos/update-categories.dto';
import { Category } from './interfaces/categories.interface';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories')
    private readonly categoriesModel: Model<Category>,
  ) {}

  async GetCategoryByCategory(category: string): Promise<Category> {
    const currentCategory = await this.categoriesModel
      .findOne({ category })
      .populate('players')
      .exec();

    if (!currentCategory) {
      throw new NotFoundException('Category not found');
    }

    return currentCategory;
  }

  async GetCategories(): Promise<Category[]> {
    return await this.categoriesModel.find().populate('players').exec();
  }

  async Create({
    category,
    description,
    events,
  }: CreateCategoriesDto): Promise<Category> {
    const currentCategory = await this.categoriesModel
      .findOne({ category: category.toUpperCase() })
      .exec();

    if (currentCategory) {
      return currentCategory;
    }

    const current = new this.categoriesModel({ category, description, events });
    return current.save();
  }

  async Update(
    category: string,
    updateCategoriesDto: UpdateCategoriesDto,
  ): Promise<Category> {
    const currentCategory = await this.GetCategoryByCategory(category);

    return this.categoriesModel
      .findByIdAndUpdate(
        { _id: currentCategory._id },
        { $set: updateCategoriesDto },
      )
      .exec();
  }

  async AddPlayers(category: string, playerId: any): Promise<void> {
    const currentCategory = await this.GetCategoryByCategory(category);
    currentCategory.players.push(playerId);

    await this.categoriesModel
      .findOneAndUpdate({ _id: currentCategory._id }, { $set: currentCategory })
      .exec();
  }
}
