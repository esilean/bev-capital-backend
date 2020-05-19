import socketio from 'socket.io'
import { Logger } from 'log4js'
import { Server } from 'http'
import Stock from '../../d-domain/entities/stock'
import { GetAllStockServiceInterface } from '../../c-services/interfaces/stock.service.interface'
import StockPrice from '../../d-domain/entities/stock.prices'
import { GetStockQuoteIEXServiceInterface } from '../../c-services/interfaces/iex/stock.quote.iex.service.interface'
import { ConfigInterface } from '../../e-infra/cross-cutting/utils/interfaces/config.interface'

export interface SocketIOInterface {
  connect(server: Server): socketio.Server
  start(io: socketio.Server): void
}

const getStock = (
  io: socketio.Server,
  interval: string,
  stock: string,
  getStockQuoteIexService: GetStockQuoteIEXServiceInterface
): void => {
  const nsstock = io.of(`/${stock}`)

  nsstock.on('connection', (socket) => {
    const intervalId = setInterval(() => {
      getStockQuoteIexService.execute(stock).then((stockPrice: StockPrice) => {
        const { symbol, low, high, latestPrice, latestPriceTime, previousClosePrice } = stockPrice
        const changePercent = previousClosePrice > 0 ? (latestPrice / previousClosePrice - 1) * 100.0 : 0.0
        socket.emit(symbol, { symbol, low, high, latestPrice, latestPriceTime, previousClosePrice, changePercent })
      })
      //.catch((error) => console.log(error))
    }, 1000 * parseInt(interval))

    socket.on('disconnect', () => {
      clearInterval(intervalId)
    })
  })
}

export class SocketIO implements SocketIOInterface {
  private logger: Logger
  private config: ConfigInterface

  private getAllStockService: GetAllStockServiceInterface
  private getStockQuoteIexService: GetStockQuoteIEXServiceInterface

  constructor(
    logger: Logger,
    config: ConfigInterface,
    getAllStockService: GetAllStockServiceInterface,
    getStockQuoteIexService: GetStockQuoteIEXServiceInterface
  ) {
    this.logger = logger
    this.config = config

    this.getAllStockService = getAllStockService
    this.getStockQuoteIexService = getStockQuoteIexService
  }

  connect(server: Server): socketio.Server {
    const io = socketio(server)
    this.logger.info('Starting socket')
    return io
  }

  start(io: socketio.Server): void {
    const interval = this.config.intervalSecSendClient

    this.getAllStockService.execute().then((stocks: Stock[]) => {
      stocks.forEach((s) => {
        getStock(io, interval, s.symbol, this.getStockQuoteIexService)
      })
    }).catch(error => {
      this.logger.error(error)
    })
  }
}
