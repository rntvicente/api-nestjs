import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlayerDto } from './dtos/create-players.dto';
import { Player } from './interfaces/players.interface';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  constructor(
    @InjectModel('Players') private readonly playersModel: Model<Player>,
  ) {}

  async UpsertPlayer({
    name,
    email,
    phoneNumber,
  }: CreatePlayerDto): Promise<Player> {
    const existsPlayer = await this.playersModel.findOne({ email }).exec();

    if (!existsPlayer) {
      return this.Create({ name, email, phoneNumber });
    } else {
      return this.Update(existsPlayer, { name, email, phoneNumber });
    }
  }

  async GetPlayerByEmail(email: string): Promise<Player> {
    const currentPlayer = await this.playersModel.findOne({ email }).exec();

    if (!currentPlayer) {
      throw new Error('No player found');
    }

    return currentPlayer;
  }

  async GetPlayers(): Promise<Player[]> {
    return this.playersModel.find().exec();
  }

  async Create({ name, email, phoneNumber }: CreatePlayerDto): Promise<Player> {
    const current = new this.playersModel({ name, email, phoneNumber });
    return current.save();
  }

  async Update(
    currentPlayer: Player,
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const { _id } = currentPlayer;
    return this.playersModel
      .findByIdAndUpdate({ _id }, { $set: createPlayerDto })
      .exec();
  }

  async DeletePlayerByEmail(email: string): Promise<void> {
    return this.playersModel.remove({ email }).exec();
  }
}
