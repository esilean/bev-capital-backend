import { PriceIEXWorkerInterface } from '../../interfaces/workers/price.iex.worker.interface'
import { GetAllStockQuoteIEXServiceInterface } from '../../interfaces/iex/stock.quote.iex.service.interface'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'

export default class PriceIEXWorker implements PriceIEXWorkerInterface {
  private getAllStockQuoteIexService: GetAllStockQuoteIEXServiceInterface
  private stockPriceDomain: StockPriceDomainInterface

  constructor(getAllStockQuoteIexService: GetAllStockQuoteIEXServiceInterface, stockPriceDomain: StockPriceDomainInterface) {
    this.getAllStockQuoteIexService = getAllStockQuoteIexService
    this.stockPriceDomain = stockPriceDomain
  }
  async generatePrice(symbols: string[]): Promise<void> {
    const stocksPrice = await this.getAllStockQuoteIexService.execute(symbols)
    stocksPrice.forEach((sp) => {
      this.stockPriceDomain.createOrUpdate(sp)
    })
  }
}
