import express, { Router } from 'express'
import { AddressInfo } from 'net'
import { ServerInterface } from './interfaces/server.interface'
import { ConfigInterface } from '../e-infra/cross-cutting/utils/interfaces/config.interface'
import { Logger } from 'log4js'
import { AuthInterface } from '../e-infra/cross-cutting/authentication/interfaces/auth.interface'
import http from 'http'
import { SocketIOInterface } from './socket'
import socketio from 'socket.io'
import { CronIEXInterface, CronFinnHubInterface } from '../c-services/cron/interfaces/cron.interfaces'

export class Server implements ServerInterface {
  private server: http.Server
  private config: ConfigInterface
  private logger: Logger
  private sockio: SocketIOInterface
  private io: socketio.Server
  private cronIex: CronIEXInterface
  private cronFinnhub: CronFinnHubInterface

  constructor(
    router: Router,
    sockio: SocketIOInterface,
    cronIex: CronIEXInterface,
    cronFinnhub: CronFinnHubInterface,
    auth: AuthInterface,
    config: ConfigInterface,
    logger: Logger
  ) {
    this.config = config
    this.logger = logger

    const app = express()
    app.disable('x-powered-by')
    app.use(auth.initialize())
    app.use(router)

    this.server = http.createServer(app)

    this.sockio = sockio
    this.io = this.sockio.connect(this.server)

    this.cronIex = cronIex
    this.cronFinnhub = cronFinnhub
  }

  app(): http.Server {
    return this.server
  }

  startServer(): void {
    const http = this.server.listen(this.config.port, () => {
      const { port } = http.address() as AddressInfo
      this.logger.info(`API is running on port: ${port}`)

      //open socket
      this.sockio.start(this.io)

      //choose a provider for "real-time prices"
      if (this.config.provider.toLowerCase() === 'iex') {
        this.logger.info('Using IEX')
        //start cron for IEX provider
        this.cronIex.getPriceFromIEX()
      } else {
        this.logger.info('Using Finnhub')
        //start cron for Finnhub provider
        this.cronFinnhub.getPriceFromFinnHub()
      }
    })
  }
}
