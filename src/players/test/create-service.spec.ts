import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { CreatePlayerDto } from '../dtos/create-players.dto';
import { PlayersService } from '../players.service';

describe.only('Service: Create', () => {
  let service: PlayersService;
  const mock: CreatePlayerDto = {
    name: 'valid_name',
    email: 'valid_email',
    phoneNumber: 'valid_phoneNumber',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PlayersService,
        { provide: getModelToken('Players'), useValue: {} },
      ],
    }).compile();

    service = moduleRef.get<PlayersService>(PlayersService);
  });

  it('deve chamar metodo "Create" corretamente', async () => {
    const createSpy = jest.spyOn(service, 'Create');
    await service.Create(mock);

    expect(createSpy).toHaveBeenCalledWith(mock);
  });
});
