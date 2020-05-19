import container from '../../../setup'
import { GetStockQuoteIEXServiceInterface } from '../../../../src/c-services/interfaces/iex/stock.quote.iex.service.interface'

describe('Services -> Iex -> getStockQuote', () => {
  let getStockQuoteIexService: GetStockQuoteIEXServiceInterface
  beforeAll(() => {
    getStockQuoteIexService = container.resolve<GetStockQuoteIEXServiceInterface>('getStockQuoteIexService')
  })

  describe('#getStockQuoteIexService', () => {
    it('when there is quote', async (done) => {
      const stockPrice = await getStockQuoteIexService.execute('aapl')

      expect(stockPrice).toHaveProperty('latestPrice')
      done()
    })
  })
})
