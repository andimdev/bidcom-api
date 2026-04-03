import { UpdateProductUseCase } from '@application/use-cases/update-product.use-case'
import { ProductNotFoundError } from '@domain/errors/product.errors'

describe('UpdateProductUseCase', () => {
  let repo: any
  let cache: any
  let useCase: UpdateProductUseCase

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      update: jest.fn(),
    }

    cache = { clear: jest.fn() }

    useCase = new UpdateProductUseCase(repo, cache)
  })

  it('should update product', async () => {
    const product = {
      update: jest.fn(),
      isDeleted: () => false,
    }

    repo.findById.mockResolvedValue(product)
    repo.update.mockResolvedValue(product)

    const result = await useCase.execute('1', { name: 'new' })

    expect(product.update).toHaveBeenCalled()
    expect(repo.update).toHaveBeenCalled()
    expect(cache.clear).toHaveBeenCalled()
    expect(result).toBeDefined()
  })

  it('should throw if not found', async () => {
    repo.findById.mockResolvedValue(null)

    await expect(
      useCase.execute('1', {}),
    ).rejects.toThrow(ProductNotFoundError)
  })
})