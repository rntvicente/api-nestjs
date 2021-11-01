import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

// eslint-disable-next-line prettier/prettier
const uriMongo = 'mongodb+srv://admin:xP2j52h7LAwfGms9@cluster0.yqcau.mongodb.net/api-smartranking?retryWrites=true&w=majority';
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
@Module({
  imports: [
    PlayersModule,
    CategoriesModule,
    MongooseModule.forRoot(uriMongo, opts),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
