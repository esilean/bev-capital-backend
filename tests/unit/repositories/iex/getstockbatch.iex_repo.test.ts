import container from '../../../setup'
import { StockQuoteIEXRepositoryInterface } from '../../../../src/e-infra/data/interfaces/iex/stock.quote.iex.repository.interface'

describe('Infra -> Data -> Repositories -> StockBatchIex', () => {
  let stockQuoteIexRepository: StockQuoteIEXRepositoryInterface
  beforeAll(() => {
    stockQuoteIexRepository = container.resolve<StockQuoteIEXRepositoryInterface>('stockQuoteIexRepository')
  })

  describe('#getStockQuoteIex', () => {
    it('when batch quotes of stocks', async (done) => {
      const stocks = await stockQuoteIexRepository.getStocksQuote(['AAPL', 'FB'])

      expect(stocks.length).toBe(2)
      expect(stocks[0]).toHaveProperty('latestPrice')
      done()
    })
  })
})
