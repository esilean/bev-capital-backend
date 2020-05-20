import { PriceIEXWorkerInterface } from '../../interfaces/workers/price.iex.worker.interface'
import { GetAllStockQuoteIEXServiceInterface } from '../../interfaces/iex/stock.quote.iex.service.interface'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import { RedisInterface } from '../../../e-infra/redis/interfaces/redis.interface'
import { Logger } from 'log4js'

export default class PriceIEXWorker implements PriceIEXWorkerInterface {
  private getAllStockQuoteIexService: GetAllStockQuoteIEXServiceInterface
  private stockPriceDomain: StockPriceDomainInterface
  private redisClient: RedisInterface
  private logger: Logger

  constructor(
    redisClient: RedisInterface,
    logger: Logger,
    getAllStockQuoteIexService: GetAllStockQuoteIEXServiceInterface,
    stockPriceDomain: StockPriceDomainInterface
  ) {
    this.getAllStockQuoteIexService = getAllStockQuoteIexService
    this.stockPriceDomain = stockPriceDomain
    this.redisClient = redisClient
    this.logger = logger
  }
  async generatePriceIEX(symbols: string[]): Promise<void> {
    const stocksPrice = await this.getAllStockQuoteIexService.execute(symbols)
    stocksPrice.forEach((sp) => {
      //when the price updates, we clean cache to next calls get from DB
      this.redisClient.del(`${sp.symbol}.PRICE`, async (err) => {
        if (err) {
          this.logger.error(err)
        }

        this.stockPriceDomain.update(sp, { where: { symbol: sp.symbol } })
      })
    })
  }
}
