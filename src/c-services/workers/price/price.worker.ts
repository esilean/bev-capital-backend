import socketio from 'socket.io'
import { GetStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'
import { PriceWorkerInterface } from '../../interfaces/workers/price.worker.interface'
import { ConfigInterface } from '../../../e-infra/cross-cutting/utils/interfaces/config.interface'
import { Logger } from 'log4js'
import { clearInterval } from 'timers'

export default class PriceWorker implements PriceWorkerInterface {
  private getStockPriceService: GetStockPriceServiceInterface
  private config: ConfigInterface
  private logger: Logger
  constructor(config: ConfigInterface, logger: Logger, getStockPriceService: GetStockPriceServiceInterface) {
    this.config = config
    this.logger = logger
    this.getStockPriceService = getStockPriceService
  }

  sendPriceToClient(io: socketio.Server, symbol: string): void {
    const interval = this.config.intervalSecSendClient

    const nsstock = io.of(`/${symbol}`)

    nsstock.on('connection', (socket) => {
      const intervalId = setInterval(
        function run(that) {
          that.getStockPriceService
            .execute(symbol)
            .then((stockPrice: StockPrice) => {
              if (stockPrice) {
                const { symbol, low, high, latestPrice, latestPriceTime, previousClosePrice, changePercent } = stockPrice
                socket.emit(symbol, { symbol, low, high, latestPrice, latestPriceTime, previousClosePrice, changePercent })
              }
            })
            .catch((error: Error) => that.logger.error(error))
        },
        1000 * parseInt(interval),
        this,
        socket,
        symbol
      )

      socket.on('disconnect', () => {
        clearInterval(intervalId)
      })
    })
  }
}
