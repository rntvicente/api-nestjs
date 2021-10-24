import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreatePlayerDto } from './dtos/create-players.dto';
import { Player } from './interfaces/players.interface';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  async UpsertPlayer({
    name,
    email,
    phoneNumber,
  }: CreatePlayerDto): Promise<void> {
    this.Create({ name, email, phoneNumber });
  }

  async GetPlayerByEmail(email: string): Promise<Player> {
    const currentPlayer = this.players.find((player) => player.email === email);
    return currentPlayer;
  }

  async GetPlayers(): Promise<Player[]> {
    return this.players;
  }

  Create({ name, email, phoneNumber }: CreatePlayerDto): void {
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
