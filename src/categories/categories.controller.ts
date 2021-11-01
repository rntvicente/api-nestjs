import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dtos/create-categories.dto';
import { UpdateCategoriesDto } from './dtos/update-categories.dto';
import { Category } from './interfaces/categories.interface';

@Controller('api/categories')
export class CategoriesController {
  private readonly categoriesService: CategoriesService;

  constructor(categoriesService: CategoriesService) {
    this.categoriesService = categoriesService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() { category, description, events }: CreateCategoriesDto,
  ) {
    return await this.categoriesService.CreateCategories({
      category,
      description,
      events,
    });
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Param('category') category: string,
    @Body() { description, events }: UpdateCategoriesDto,
  ): Promise<Category> {
    return await this.categoriesService.UpdateCategoryByCategory(category, {
      description,
      events,
    });
  }
}
