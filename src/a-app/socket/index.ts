import socketio from 'socket.io'
import { Logger } from 'log4js'
import { Server } from 'http'
import { GetAllStockServiceInterface } from '../../c-services/interfaces/stock.service.interface'
import { PriceWorkerInterface } from '../../c-services/interfaces/workers/price.worker.interface'

export interface SocketIOInterface {
  connect(server: Server): socketio.Server
  start(io: socketio.Server): void
}

export class SocketIO implements SocketIOInterface {
  private logger: Logger

  private getAllStockService: GetAllStockServiceInterface
  private priceWorker: PriceWorkerInterface

  constructor(logger: Logger, getAllStockService: GetAllStockServiceInterface, priceWorker: PriceWorkerInterface) {
    this.logger = logger

    this.getAllStockService = getAllStockService
    this.priceWorker = priceWorker
  }

  connect(server: Server): socketio.Server {
    const io = socketio(server)
    return io
  }

  async start(io: socketio.Server): Promise<void> {
    try {
      this.logger.info('Starting socket')

      //get all stocks for opening a socket for each one
      const stocks = await this.getAllStockService.execute()
      stocks.forEach((s) => {
        this.priceWorker.sendPriceToClient(io, s.symbol)
      })
    } catch (error) {
      this.logger.error(error)
    }
  }
}
