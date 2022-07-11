import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengeModule } from './challenge/challenge.module';

config();

const uriMongo = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PWD}@cluster0.yqcau.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

@Module({
  imports: [
    PlayersModule,
    CategoriesModule,
    MongooseModule.forRoot(uriMongo, opts),
    ChallengeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
