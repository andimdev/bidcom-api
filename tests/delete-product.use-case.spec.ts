import { DeleteProductUseCase } from '@application/use-cases/delete-product.use-case'

describe('DeleteProductUseCase', () => {
  let repo: any
  let cache: any
  let useCase: DeleteProductUseCase

  beforeEach(() => {
    repo = { delete: jest.fn() }
    cache = { clear: jest.fn() }

    useCase = new DeleteProductUseCase(repo, cache)
  })

  it('should delete product and clear cache', async () => {
    await useCase.execute('1')

    expect(repo.delete).toHaveBeenCalledWith('1')
    expect(cache.clear).toHaveBeenCalled()
  })
})