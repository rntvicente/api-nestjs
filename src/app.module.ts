import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

config();

// eslint-disable-next-line prettier/prettier
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
