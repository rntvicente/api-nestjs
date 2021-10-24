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
  async upsertPlayers(@Body() { name, email, phoneNumber }: CreatePlayerDto) {
    this.playersService.upsertPlayer({ name, email, phoneNumber });
  }
}
