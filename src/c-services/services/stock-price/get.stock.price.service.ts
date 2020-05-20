import { GetStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'
import { optOneStockPrice } from './options'
import { NotFoundError } from '../../../e-infra/cross-cutting/utils/errors/error.handler'
import { RedisInterface } from '../../../e-infra/redis/interfaces/redis.interface'
import { ConfigInterface } from '../../../e-infra/cross-cutting/utils/interfaces/config.interface'
import { toEntity } from '../../../e-infra/data/repositories/mappers/stock.price.mapper'

export default class GetStockPriceService implements GetStockPriceServiceInterface {
  private readonly stockPriceDomain: StockPriceDomainInterface
  private readonly redisClient: RedisInterface
  private readonly config: ConfigInterface

  constructor(config: ConfigInterface, redisClient: RedisInterface, stockPriceDomain: StockPriceDomainInterface) {
    this.redisClient = redisClient
    this.config = config
    this.stockPriceDomain = stockPriceDomain
  }

  async execute(symbol: string): Promise<StockPrice> {
    return new Promise((resolve, reject) => {
      this.redisClient.get(`${symbol}.PRICE`, async (err, data) => {
        if (err) {
          reject(`REDIS: Error getting key ${symbol}.PRICE: ${err}`)
        }

        if (data != null) {
          const stockPrice: StockPrice = toEntity(JSON.parse(data))
          resolve(stockPrice)
        } else {
          const stockPrice = await this.stockPriceDomain.getAll(optOneStockPrice(symbol))
          if (stockPrice[0] === undefined) {
            reject(new NotFoundError('Stock Price cannot be found'))
          } else {
            const {
              open,
              close,
              high,
              low,
              latestPrice,
              latestPriceTime,
              delayedPrice,
              delayedPriceTime,
              previousClosePrice,
            } = stockPrice[0]
            this.redisClient.setex(
              `${symbol}.PRICE`,
              parseInt(this.config.intervalSecCacheRedis),
              JSON.stringify({
                symbol,
                open,
                close,
                high,
                low,
                latestPrice,
                latestPriceTime,
                delayedPrice,
                delayedPriceTime,
                previousClosePrice,
              })
            )
            resolve(stockPrice[0])
          }
        }
      })
    })
  }
}
