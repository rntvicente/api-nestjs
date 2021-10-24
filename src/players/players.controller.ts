import { Body, Controller, Post } from '@nestjs/common';

import { CreatePlayerDto } from './dtos/create-players.dto';
import { PlayersService } from './players.service';

@Controller('api/players')
export class PlayersController {
  private readonly playersService: PlayersService;

  constructor(playersService: PlayersService) {
    this.playersService = playersService;
  }

  @Post()
  async UpsertPlayers(@Body() { name, email, phoneNumber }: CreatePlayerDto) {
    await this.playersService.UpsertPlayer({ name, email, phoneNumber });
  }
}
