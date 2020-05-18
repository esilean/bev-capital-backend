import socketio from 'socket.io'
import { Logger } from 'log4js'
import { Server } from 'http'
import { StockPriceModelInterface } from '../../e-infra/data/models/stock/stock.price.model'
import faker from 'faker'
import { ConfigInterface } from '../../e-infra/cross-cutting/utils/interfaces/config.interface'

export interface SocketIOInterface {
  connect(server: Server): void
}

const getPrices = async (socket: socketio.Socket, stockPriceModel: StockPriceModelInterface): Promise<void> => {
  let delayedPrice = faker.random.number(10)

  await stockPriceModel.update(
    {
      delayedPrice,
    },
    {
      where: {
        symbol: 'AWR',
      },
    }
  )

  delayedPrice = faker.random.number(20)

  await stockPriceModel.update(
    {
      delayedPrice,
    },
    {
      where: {
        symbol: 'FB',
      },
    }
  )

  socket.emit('updateStocks')
}

export class SocketIO implements SocketIOInterface {
  private logger: Logger
  private config: ConfigInterface
  private stockPriceModel: StockPriceModelInterface

  constructor(stockPriceModel: StockPriceModelInterface, logger: Logger, config: ConfigInterface) {
    this.logger = logger
    this.config = config
    this.stockPriceModel = stockPriceModel
  }

  connect(server: Server): void {
    const io = socketio(server)

    this.logger.info('Starting socket')

    let intervalId: NodeJS.Timeout
    io.on('connection', (socket) => {
      this.logger.info('New client connected')

      intervalId = setInterval(() => {
        getPrices(socket, this.stockPriceModel)
      }, 1000 * parseInt(this.config.intervalSec))

      socket.on('disconnect', () => {
        clearInterval(intervalId)
        this.logger.info('Client disconnected')
      })
    })
  }
}
