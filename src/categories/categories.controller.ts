import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dtos/create-categories.dto';

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
}
