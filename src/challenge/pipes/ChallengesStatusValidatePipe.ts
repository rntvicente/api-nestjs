import { BadRequestException, PipeTransform } from '@nestjs/common'

import { ChallengeStatusEnum } from '../interfaces/challenges-status.enum'

export class ChallengesStatusValidatePipe implements PipeTransform {
  readonly status = [
    ChallengeStatusEnum.ACCEPT,
    ChallengeStatusEnum.DENIED,
    ChallengeStatusEnum.CANCELED,
  ]

  transform(value) {
    const validatedStatus = this.hasStatus(value?.status.toUpperCase())

    if (!validatedStatus) {
      throw new BadRequestException(`Invalid status: ${value?.status} `)
    }

    return value
  }

  private hasStatus(status) {
    return this.status.includes(status)
  }
}
