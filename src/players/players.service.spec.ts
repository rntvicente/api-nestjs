import { Test } from '@nestjs/testing';
import { CreatePlayerDto } from './dtos/create-players.dto';

import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let service: PlayersService;
  const mock: CreatePlayerDto = {
    name: 'any_name',
    email: 'any_email',
    phoneNumber: 'any_phoneNumber',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PlayersService],
    }).compile();

    service = moduleRef.get<PlayersService>(PlayersService);
  });

  it('should call create with param correctlty', async () => {
    const createSpy = jest.spyOn(service, 'Create');
    await service.UpsertPlayer(mock);

    expect(createSpy).toHaveBeenCalledWith(mock);
  });
});
