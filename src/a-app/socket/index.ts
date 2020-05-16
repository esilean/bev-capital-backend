import socketio from 'socket.io'
import { Logger } from 'log4js'
import { Server } from 'http'

export interface SocketIOInterface {
  connect(server: Server): void
}

export class SocketIO implements SocketIOInterface {
  private logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  connect(server: Server): void {
    const io = socketio(server)

    this.logger.info('Starting socket')

    let intervalId: NodeJS.Timeout
    io.on('connection', (socket) => {
      this.logger.info('New client connected')

      if (intervalId) clearInterval(intervalId)

      intervalId = setInterval(() => {
        socket.emit('updateStocks')
      }, 10000)

      socket.on('disconnect', () => {
        clearInterval(intervalId)
        this.logger.info('Client disconnected')
      })
    })
  }
}
