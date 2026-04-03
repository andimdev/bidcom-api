import { CreateProductUseCase } from '@application/use-cases/create-product.use-case'
import { ProductAlreadyExistsError } from '@domain/errors/product.errors'

const copy = {
  id: '1',
  name: 'test',
  price: 10,
  stock: 10,
  category: 'category',
  brand: 'brand',
}

describe('CreateProductUseCase', () => {
  let repo: any
  let cache: any
  let useCase: CreateProductUseCase

  beforeEach(() => {
    repo = {
      search: jest.fn(),
      create: jest.fn(),
    }

    cache = { clear: jest.fn() }

    useCase = new CreateProductUseCase(repo, cache)
  })

  it('should create a product successfully', async () => {
    repo.search.mockResolvedValue({ items: [] })
    repo.create.mockResolvedValue({ id: '1' })

    const result = await useCase.execute({ ...copy })

    expect(result).toBeDefined()
    expect(repo.create).toHaveBeenCalled()
  })

  it('should throw if product already exists', async () => {
    repo.search.mockResolvedValue({ items: [{}] })

    await expect(
      useCase.execute({ ...copy }),
    ).rejects.toThrow(ProductAlreadyExistsError)
  })
})