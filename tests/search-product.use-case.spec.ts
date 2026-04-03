import { SearchProductsUseCase } from '@application/use-cases/search-product.use-case'

describe('SearchProductsUseCase', () => {
  let repo: any
  let useCase: SearchProductsUseCase

  beforeEach(() => {
    repo = { search: jest.fn() }

    useCase = new SearchProductsUseCase(repo)
  })

  it('should search products with filters', async () => {
    repo.search.mockResolvedValue({
      items: [],
      total: 0,
    })

    const result = await useCase.execute({ name: 'test' })

    expect(repo.search).toHaveBeenCalledWith({ name: 'test' })
    expect(result.items).toBeDefined()
  })
})