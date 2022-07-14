import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ValidateParamsPipe } from 'commons/pipes/validate-params.pipe'

import { CreatePlayerDto } from './dtos/create-players.dto'
import { UpdatePlayerDto } from './dtos/update-players.dto'
import { Player } from './interfaces/players.interface'
import { PlayersService } from './players.service'
@Controller('api/players')
export class PlayersController {
  private readonly playersService: PlayersService

  constructor(playersService: PlayersService) {
    this.playersService = playersService
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayers(
    @Body() { name, email, phoneNumber }: CreatePlayerDto,
  ): Promise<Player> {
    return await this.playersService.Create({ name, email, phoneNumber })
  }

  @Put('/:email')
  @UsePipes(ValidationPipe)
  async UpdatePlayerByEmail(
    @Param('email', ValidateParamsPipe) email: string,
    @Body() { name, phoneNumber }: UpdatePlayerDto,
  ): Promise<Player> {
    return await this.playersService.UpdatePlayerByEmail(email, {
      name,
      phoneNumber,
    })
  }

  @Get()
  async GetPlayers(): Promise<Player[]> {
    return await this.playersService.GetPlayers()
  }

  @Get('/:email')
  async GetPlayerByEmail(
    @Param('email', ValidateParamsPipe) email: string,
  ): Promise<Player> {
    return await this.playersService.GetPlayerByEmail(email)
  }

  @Delete('/:email')
  async DeletePlayersByEmail(
    @Param('email', ValidateParamsPipe) email: string,
  ): Promise<void> {
    await this.playersService.DeletePlayerByEmail(email)
  }
}
