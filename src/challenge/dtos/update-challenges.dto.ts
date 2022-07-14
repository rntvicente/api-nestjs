import { PartialType } from '@nestjs/mapped-types'
import { CreateChallengeDto } from './create-challenges.dto'

export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {}
