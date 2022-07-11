import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './category/categories.module';
import { ChallengesModule } from './challenge/challenges.module';

config();

const uriMongo = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PWD}@cluster0.yqcau.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

@Module({
  imports: [
    MongooseModule.forRoot(uriMongo, opts),
    PlayersModule,
    CategoriesModule,
    ChallengesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
