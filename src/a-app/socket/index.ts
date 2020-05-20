import socketio from 'socket.io'
import { Logger } from 'log4js'
import { Server } from 'http'
import Stock from '../../d-domain/entities/stock'
import { GetAllStockServiceInterface } from '../../c-services/interfaces/stock.service.interface'
import { PriceWorkerInterface } from '../../c-services/interfaces/workers/price.worker.interface'
import { PriceIEXWorkerInterface } from '../../c-services/interfaces/workers/price.iex.worker.interface'
import { ConfigInterface } from '../../e-infra/cross-cutting/utils/interfaces/config.interface'

export interface SocketIOInterface {
  connect(server: Server): socketio.Server
  start(io: socketio.Server): void
}

export class SocketIO implements SocketIOInterface {
  private logger: Logger
  private config: ConfigInterface

  private getAllStockService: GetAllStockServiceInterface
  private priceWorker: PriceWorkerInterface
  private priceIexWorker: PriceIEXWorkerInterface

  constructor(
    config: ConfigInterface,
    logger: Logger,
    getAllStockService: GetAllStockServiceInterface,
    priceWorker: PriceWorkerInterface,
    priceIexWorker: PriceIEXWorkerInterface
  ) {
    this.config = config
    this.logger = logger

    this.getAllStockService = getAllStockService
    this.priceWorker = priceWorker
    this.priceIexWorker = priceIexWorker
  }

  connect(server: Server): socketio.Server {
    const io = socketio(server)
    return io
  }

  start(io: socketio.Server): void {
    this.logger.info('Starting socket')

    this.getAllStockService
      .execute()
      .then((stocks: Stock[]) => {
        //get prices from IEX Provider
        const symbols = stocks.map((sp) => sp.symbol)
        setInterval(() => {
          this.priceIexWorker.generatePriceIEX(symbols)
        }, 1000 * parseInt(this.config.intervalSecGetFromIex))

        //for each stock open a new socket namespace (nspc = symbol name)
        stocks.forEach((s) => {
          this.priceWorker.getPrice(io, s.symbol)
        })
      })
      .catch((error) => {
        this.logger.error(error)
      })
  }
}
