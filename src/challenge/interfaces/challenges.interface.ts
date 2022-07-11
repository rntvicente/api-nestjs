import { Document } from 'mongoose';

import { Player } from 'players/interfaces/players.interface';
import { ChallengeStatus } from './challenges-status.enum';

export interface Challenge extends Document {
  challengeDate: Date;
  status: ChallengeStatus;
  requestDate: Date;
  responseDate: Date;
  category: string;
  players: Array<Player>;
  match: Match;
}

export interface Match extends Document {
  category: string;
  players: Array<Player>;
  defender: Player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}
