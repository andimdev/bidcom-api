import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { _env } from '@config/vars'
import { traceMiddleware } from '@common/middleware/trace.middleware'
import { HttpExceptionFilter } from '@common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  app.use(traceMiddleware)
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(_env.PORT)
}

bootstrap()