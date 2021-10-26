import * as mongoose from 'mongoose';

export const PlayersSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    position: Number,
    photo: String,
  },
  { timestamps: true, collection: 'players' },
);
