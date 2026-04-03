import { GetProductUseCase } from '@application/use-cases/get-product.use-case'
import { ProductNotFoundError } from '@domain/errors/product.errors'

describe('GetProductUseCase', () => {
  let repo: any
  let useCase: GetProductUseCase

  beforeEach(() => {
    repo = { findById: jest.fn() }

    useCase = new GetProductUseCase(repo)
  })

  it('should return product if exists', async () => {
    repo.findById.mockResolvedValue({
      id: '1',
      isDeleted: () => false,
    })

    const result = await useCase.execute('1')

    expect(result).toBeDefined()
  })

  it('should throw if not found', async () => {
    repo.findById.mockResolvedValue(null)

    await expect(useCase.execute('1')).rejects.toThrow(
      ProductNotFoundError,
    )
  })

  it('should throw if product is deleted', async () => {
    repo.findById.mockResolvedValue({
      isDeleted: () => true,
    })

    await expect(useCase.execute('1')).rejects.toThrow(
      ProductNotFoundError,
    )
  })
})