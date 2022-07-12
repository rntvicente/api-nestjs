import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';

import { ChallengeService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenges.dto';

@Controller('api/challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  private readonly logger = new Logger(ChallengeController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() { challengeDate, challenger, players }: CreateChallengeDto,
  ) {
    return await this.challengeService.create({
      challengeDate,
      challenger,
      players,
    });
  }
}
