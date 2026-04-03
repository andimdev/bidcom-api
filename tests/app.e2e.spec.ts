import {
  Test,
  TestingModule,
} from '@nestjs/testing'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppModule } from '../src/app.module'
import { ProductOrmEntity } from '@infrastructure/database/product.orm-entity'
import { AppLogger } from '@common/logger/logger.service'
import { LoggingInterceptor } from '@common/logger/logging.interceptor'
import { ResponseInterceptor } from '@common/logger/response.interceptor'
import { traceMiddleware } from '@common/middleware/trace.middleware'

const copy = {
  name: 'Laptop',
  description: 'Victus',
  price: 700.80,
  stock: 2,
  category: 'Tech',
  brand: 'HP'
}

describe('Products API', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [ProductOrmEntity],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()

    app.use(traceMiddleware)

    const logger = new AppLogger()

    app.useGlobalInterceptors(
      new LoggingInterceptor(logger),
      new ResponseInterceptor(),
    )

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/products - POST', async () => {
    const res = await request(app.getHttpServer())
      .post('/products')
      .send({ ...copy })

    expect(res.status).toBe(201)
    expect(res.body.data.name).toBe('Laptop')
  })

  it('/products - GET', async () => {
    const res = await request(app.getHttpServer()).get('/products')

    expect(res.status).toBe(200)
    expect(res.body.data.items).toBeDefined()
  })

  it('/products/:id - GET (NOT FOUND)', async () => {
    const res = await request(app.getHttpServer()).get(
      '/products/random-value',
    )

    expect(res.status).toBe(404)
  })
})