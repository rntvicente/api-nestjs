import { Body, Controller, Post } from '@nestjs/common';

import { CreatePlayerDto } from './dtos/create-players.dto';

@Controller('api/players')
export class PlayersController {
  @Post()
  async upsertPlayers(@Body() { email }: CreatePlayerDto) {
    return { email };
  }
}
