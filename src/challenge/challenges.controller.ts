import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Logger,
  Get,
} from '@nestjs/common'

import { ChallengeService } from './challenges.service'
import { CreateChallengeDto } from './dtos/create-challenges.dto'
import { Challenge } from './interfaces/challenges.interface'

@Controller('api/challenges')
export class ChallengesController {
  constructor(private readonly challengeService: ChallengeService) {}

  private readonly logger = new Logger(ChallengesController.name)

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenges(
    @Body() { challengeDate, challenger, players }: CreateChallengeDto,
  ): Promise<Challenge> {
    return await this.challengeService.create({
      challengeDate,
      challenger,
      players,
    })
  }

  @Get()
  async getChallenges(): Promise<Challenge[]> {
    const challenges = await this.challengeService.getChallenges()

    return challenges
  }
}
