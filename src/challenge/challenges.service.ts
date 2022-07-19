import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CategoriesService } from 'category/categories.service'
import { PlayersService } from 'players/players.service'
import { CreateChallengeDto } from './dtos/create-challenges.dto'
import { ChallengeStatusEnum } from './interfaces/challenges-status.enum'
import { Challenge } from './interfaces/challenges.interface'
import { UpdateChallengeDto } from './dtos/update-challenges.dto'

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenges') readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoryService: CategoriesService,
  ) {}

  private async getGamePlayers(ids: string[]): Promise<boolean> {
    const found = await this.playersService.GetPlayersByIds(ids)
    return found.length === 2
  }

  private validateChallenger(players, challenger): boolean {
    return players.some((player) => player === challenger)
  }

  async create({
    players,
    challenger,
    challengeDate,
  }: CreateChallengeDto): Promise<Challenge> {
    const validatedPlayers = await this.getGamePlayers(players)

    if (!validatedPlayers) {
      throw new NotFoundException('One or more players not found.')
    }

    const validatedChallenger = this.validateChallenger(players, challenger)

    if (!validatedChallenger) {
      throw new NotFoundException('Challenger not found.')
    }

    const { category } = await this.categoryService.getCategoryByPlayerId(
      challenger,
    )

    if (!category) {
      throw new NotFoundException('Category not found.')
    }

    const challenge = new this.challengeModel({
      players,
      challenger,
      challengeDate,
      category: category,
      requestDate: new Date(),
      status: ChallengeStatusEnum.PENDING,
    })

    return await challenge.save()
  }

  async getChallenges(): Promise<Challenge[]> {
    const challenges = await this.challengeModel
      .find()
      .populate('players')
      .exec()

    return challenges
  }

  async updateChallengeById(
    id: string,
    { challengeDate, status }: UpdateChallengeDto,
  ): Promise<Challenge> {
    const current = await this.challengeModel.findById(id).exec()

    if (!current) {
      throw new NotFoundException('Challenge not found')
    }

    const responseDate = status ? new Date() : current.responseDate

    const filter = { _id: id }

    const set = {
      $set: { challengeDate, status: status.toUpperCase(), responseDate },
    }

    return await this.challengeModel.findByIdAndUpdate(filter, set, {
      new: true,
    })
  }
}
