import { IsOptional } from 'class-validator'

import { ChallengeStatusEnum } from 'challenge/interfaces/challenges-status.enum'

export class UpdateChallengeDto {
  @IsOptional()
  challengeDate: Date

  @IsOptional()
  status: ChallengeStatusEnum
}
