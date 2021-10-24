import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CreatePlayerDto } from './dtos/create-players.dto';
import { Player } from './interfaces/players.interface';
import { PlayersService } from './players.service';

@Controller('api/players')
export class PlayersController {
  private readonly playersService: PlayersService;

  constructor(playersService: PlayersService) {
    this.playersService = playersService;
  }

  @Post()
  async UpsertPlayers(
    @Body() { name, email, phoneNumber }: CreatePlayerDto,
  ): Promise<void> {
    await this.playersService.UpsertPlayer({ name, email, phoneNumber });
  }

  @Get()
  async GetPlayerByEmail(
    @Query('email') email: string,
  ): Promise<Player[] | Player> {
    if (email) {
      return await this.playersService.GetPlayerByEmail(email);
    }
    return await this.playersService.GetPlayers();
  }
}
