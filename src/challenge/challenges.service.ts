import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoriesService } from 'category/categories.service';
import { Player } from 'players/interfaces/players.interface';
import { PlayersService } from 'players/players.service';
import { CreateChallengeDto } from './dtos/create-challenges.dto';
import { ChallengeStatus } from './interfaces/challenges-status.enum';
import { Challenge } from './interfaces/challenges.interface';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenges') readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoryService: CategoriesService,
  ) {}

  private async getGamePlayers(players: Player[]): Promise<boolean> {
    const ids = players.map((player) => player._id);
    const found = await this.playersService.GetPlayersByIds(ids);

    return found.length === 2;
  }

  private validateChallerger(players, challenger): boolean {
    return players.some((player) => player._id === challenger);
  }

  async create({
    players,
    challenger,
    challengeDate,
  }: CreateChallengeDto): Promise<Challenge> {
    const validatedPlayers = await this.getGamePlayers(players);

    if (!validatedPlayers) {
      throw new NotFoundException('One or more players not found.');
    }

    const validatedChallenger = this.validateChallerger(players, challenger);

    if (!validatedChallenger) {
      throw new NotFoundException('Challenger not found.');
    }

    // eslint-disable-next-line prettier/prettier
    const { category } = await this.categoryService.getCategoryByPlayerId(challenger);

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    const challenge = new this.challengeModel({
      players,
      challenger,
      challengeDate,
      category: category,
      requestDate: new Date(),
      status: ChallengeStatus.PENDING,
    });

    return await challenge.save();
  }
}
