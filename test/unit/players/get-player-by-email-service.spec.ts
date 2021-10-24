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

  it('deve lançar erro quando não encontrado jogador', async () => {
    await expect(service.GetPlayerByEmail('any_email')).rejects.toThrow();
  });
});
