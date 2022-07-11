import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';

@Injectable()
export class ChallengeService {
  create(createChallengeDto: CreateChallengeDto) {
    return 'This action adds a new challenge';
  }

  findAll() {
    return `This action returns all challenge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
