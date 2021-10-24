import { Test } from '@nestjs/testing';

import { PlayersService } from '../../../src/players/players.service';

describe('Service: Get Players', () => {
  let service: PlayersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PlayersService],
    }).compile();

    service = moduleRef.get<PlayersService>(PlayersService);
  });

  it('deve retornar lista quando chanmado metodo "GetPlayers"', async () => {
    const players = await service.GetPlayers();
    expect(players).toStrictEqual([]);
  });
});
