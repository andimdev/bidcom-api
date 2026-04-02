import 'reflect-metadata'

import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { _env } from '@config/vars'
import { traceMiddleware } from '@common/middleware/trace.middleware'
import { HttpExceptionFilter } from '@common/filters/http-exception.filter'
import { AppLogger } from '@common/logger/logger.service'
import { LoggingInterceptor } from '@common/logger/logging.interceptor'
import { ResponseInterceptor } from '@common/logger/response.interceptor'
import { CustomCacheInterceptor } from '@common/middleware/cache.interceptor'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new AppLogger()

  const cacheManager = app.get(CACHE_MANAGER)
  const reflector = app.get(Reflector)

  app.use(traceMiddleware)

  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseInterceptor(),
    new CustomCacheInterceptor(cacheManager, reflector),
  )

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(_env.PORT)
}

bootstrap()