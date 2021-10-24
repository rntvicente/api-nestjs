import { Test } from '@nestjs/testing';
import { CreatePlayerDto } from '../../../src/players/dtos/create-players.dto';

import { PlayersService } from '../../../src/players/players.service';

describe('Service: Create', () => {
  let service: PlayersService;
  const mock: CreatePlayerDto = {
    name: 'valid_name',
    email: 'valid_email',
    phoneNumber: 'valid_phoneNumber',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PlayersService],
    }).compile();

    service = moduleRef.get<PlayersService>(PlayersService);
  });

  it('deve chamar metodo "Create" corretamente', async () => {
    const createSpy = jest.spyOn(service, 'Create');
    await service.UpsertPlayer(mock);

    expect(createSpy).toHaveBeenCalledWith(mock);
  });
});
