import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlayerDto } from './dtos/create-players.dto';
import { UpdatePlayerDto } from './dtos/update-players.dto';
import { Player } from './interfaces/players.interface';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Players')
    private readonly playersModel: Model<Player>,
  ) {}

  async GetPlayerByEmail(email: string): Promise<Player> {
    const currentPlayer = await this.playersModel.findOne({ email }).exec();

    if (!currentPlayer) {
      throw new NotFoundException('Player not found');
    }

    return currentPlayer;
  }

  async GetPlayers(): Promise<Player[]> {
    return await this.playersModel.find().exec();
  }

  async GetPlayersByIds(ids: string[]): Promise<Player[]> {
    return this.playersModel.find().in(ids).exec();
  }

  async Create({ name, email, phoneNumber }: CreatePlayerDto): Promise<Player> {
    const currentPlayer = await this.GetPlayerByEmail(email);

    if (currentPlayer) {
      return currentPlayer;
    }

    const current = new this.playersModel({ name, email, phoneNumber });
    return current.save();
  }

  async UpdatePlayerByEmail(
    email: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    const currentPlayer = await this.GetPlayerByEmail(email);

    return this.playersModel
      .findByIdAndUpdate({ _id: currentPlayer._id }, { $set: updatePlayerDto })
      .exec();
  }

  async DeletePlayerByEmail(email: string): Promise<void> {
    await this.playersModel.deleteOne({ email }).exec();
  }
}
