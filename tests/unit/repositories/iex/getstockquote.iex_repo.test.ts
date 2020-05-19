import container from '../../../setup'
import { StockQuoteIEXRepositoryInterface } from '../../../../src/e-infra/data/interfaces/iex/stock.quote.iex.repository.interface'

describe('Infra -> Data -> Repositories -> StockQuoteIex', () => {
  let stockQuoteIexRepository: StockQuoteIEXRepositoryInterface
  beforeAll(() => {
    stockQuoteIexRepository = container.resolve<StockQuoteIEXRepositoryInterface>('stockQuoteIexRepository')
  })

  describe('#getStockQuoteIex', () => {
    it('when there is quote', async (done) => {
      const response = await stockQuoteIexRepository.getStockQuote('aapl')

      expect(response).toHaveProperty('latestPrice')
      done()
    })
  })
})
