import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import { RedisInterface } from '../../../e-infra/redis/interfaces/redis.interface'
import { Logger } from 'log4js'
import { PriceFinnhubWorkerInterface } from '../../interfaces/workers/price.finnhub.worker.interface copy'
import { GetStockQuoteFinnhubServiceInterface } from '../../interfaces/finnhub/stock.quote.finnhub.service.interface'

export default class PriceFinnhubWorker implements PriceFinnhubWorkerInterface {
  private stockPriceDomain: StockPriceDomainInterface
  private redisClient: RedisInterface
  private logger: Logger
  private getStockQuoteFinnhubService: GetStockQuoteFinnhubServiceInterface

  constructor(
    redisClient: RedisInterface,
    logger: Logger,
    stockPriceDomain: StockPriceDomainInterface,
    getStockQuoteFinnhubService: GetStockQuoteFinnhubServiceInterface
  ) {
    this.stockPriceDomain = stockPriceDomain
    this.redisClient = redisClient
    this.logger = logger
    this.getStockQuoteFinnhubService = getStockQuoteFinnhubService
  }
  async generatePriceFinnhub(symbol: string): Promise<void> {
    const stockPrice = await this.getStockQuoteFinnhubService.execute(symbol)

    //when the price updates, we clean cache to next calls get from DB
    this.redisClient.del(`${stockPrice.symbol}.PRICE`, async (err) => {
      if (err) {
        this.logger.error(err)
      }

      this.stockPriceDomain.update(stockPrice, { where: { symbol: stockPrice.symbol } })
    })
  }


}
