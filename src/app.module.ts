import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlayersModule } from './players/players.module';

// eslint-disable-next-line prettier/prettier
const uriMongo = 'mongodb+srv://admin:xP2j52h7LAwfGms9@cluster0.yqcau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
@Module({
  imports: [PlayersModule, MongooseModule.forRoot(uriMongo, opts)],
  controllers: [],
  providers: [],
})
export class AppModule {}
