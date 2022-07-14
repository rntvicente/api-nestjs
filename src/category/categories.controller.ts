import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { CategoriesService } from './categories.service'
import { PlayersService } from '../players/players.service'
import { CreateCategoriesDto } from './dtos/create-categories.dto'
import { UpdateCategoriesDto } from './dtos/update-categories.dto'
import { Category } from './interfaces/categories.interface'

@Controller('api/categories')
export class CategoriesController {
  private readonly categoriesService: CategoriesService
  private readonly playersService: PlayersService

  constructor(
    categoriesService: CategoriesService,
    playersService: PlayersService,
  ) {
    this.categoriesService = categoriesService
    this.playersService = playersService
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() { category, description, events }: CreateCategoriesDto) {
    return await this.categoriesService.Create({
      category: category.toUpperCase(),
      description,
      events,
    })
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async update(
    @Param('category') category: string,
    @Body() { description, events }: UpdateCategoriesDto,
  ): Promise<Category> {
    return await this.categoriesService.Update(category.toUpperCase(), {
      description,
      events,
    })
  }

  @Get()
  async getCatogories(): Promise<Category[]> {
    return this.categoriesService.GetCategories()
  }

  @Get('/:category')
  async getCatogory(@Param('category') category: string): Promise<Category> {
    return this.categoriesService.GetCategory(category.toUpperCase())
  }

  @Post('/:category/players/:email/email')
  @UsePipes(ValidationPipe)
  async addPlayers(
    @Param('category') category: string,
    @Param('email') email: string,
  ): Promise<void> {
    await this.categoriesService.AddPlayers(category.toUpperCase(), email)
  }
}
