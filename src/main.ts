import { config } from 'dotenv'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from 'commons/filters/http-exception.filter'

config()
const PORT = process.env.PORT || 3001

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())

  Date.prototype.toJSON = function():any {
    return this.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })
  }

  await app.listen(PORT)
}

bootstrap()
