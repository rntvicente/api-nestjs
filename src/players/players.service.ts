import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreatePlayerDto } from './dtos/create-players.dto';
import { Player } from './interfaces/players.interface';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  async upsertPlayer({
    name,
    email,
    phoneNumber,
  }: CreatePlayerDto): Promise<void> {
    this.upsertPlayer({ name, email, phoneNumber });
  }

  create({ name, email, phoneNumber }: CreatePlayerDto): void {
    this.players.push({
      name,
      email,
      phoneNumber,
      id: uuidv4(),
      ranking: 'A',
      position: 1,
      photo: 'https://www.bing.com/search?q=foto123.jpg',
    });
  }
}
