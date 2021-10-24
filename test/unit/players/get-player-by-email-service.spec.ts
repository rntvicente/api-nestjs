import { Test } from '@nestjs/testing';

import { PlayersService } from '../../../src/players/players.service';

describe('Service: Get Player By Email', () => {
  let service: PlayersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PlayersService],
    }).compile();

    service = moduleRef.get<PlayersService>(PlayersService);
  });

  it('deve retornar undefined quando não encontrado jogador', async () => {
    expect(await service.GetPlayerByEmail('any_email')).toBeUndefined();
  });
});
