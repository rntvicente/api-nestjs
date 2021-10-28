import * as mongoose from 'mongoose';

export const PlayersSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    phoneNumber: String,
    name: String,
    ranking: String,
    position: Number,
    photo: String,
  },
  { timestamps: true, collection: 'players' },
);
