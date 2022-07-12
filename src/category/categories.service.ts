import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PlayersService } from 'players/players.service';
import { CreateCategoriesDto } from './dtos/create-categories.dto';
import { UpdateCategoriesDto } from './dtos/update-categories.dto';
import { Category } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories')
    private readonly categoriesModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async GetCategory(category: string): Promise<Category> {
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

  async getCategoryByPlayerId(id: any): Promise<Category> {
    const category = await this.categoriesModel
      .findOne()
      .where('players')
      .in(id);

    if (!category) {
      throw new NotFoundException('Category or player not found');
    }

    return category;
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
    const currentCategory = await this.GetCategory(category);

    return this.categoriesModel
      .findByIdAndUpdate(
        { _id: currentCategory._id },
        { $set: updateCategoriesDto },
        { new: true },
      )
      .populate('players')
      .exec();
  }

  async AddPlayers(category: string, email: string): Promise<void> {
    const { _id: playerId } = await this.playersService.GetPlayerByEmail(email);

    if (!playerId) {
      throw new NotFoundException('Player not found');
    }

    const hasPlayer = await this.categoriesModel
      .findOne({ category })
      .where('players')
      .in(playerId)
      .exec();

    if (hasPlayer) {
      throw new BadRequestException('Already contains player in category');
    }

    const currentCategory = await this.GetCategory(category);

    const push = {
      $push: {
        players: playerId,
      },
    };

    await this.categoriesModel
      .findOneAndUpdate({ _id: currentCategory._id }, push)
      .exec();
  }
}
