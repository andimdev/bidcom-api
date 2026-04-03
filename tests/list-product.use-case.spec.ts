import { ListProductsUseCase } from '@application/use-cases/list-product.use-case'

describe('ListProductsUseCase', () => {
  let repo: any
  let useCase: ListProductsUseCase

  beforeEach(() => {
    repo = { search: jest.fn() }

    useCase = new ListProductsUseCase(repo)
  })

  it('should return paginated products', async () => {
    repo.search.mockResolvedValue({
      items: [],
      total: 0,
    })

    const result = await useCase.execute({ limit: 10 })

    expect(repo.search).toHaveBeenCalled()
    expect(result.items).toBeDefined()
  })
})