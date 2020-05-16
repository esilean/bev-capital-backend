import express, { Router } from 'express'
import { AddressInfo } from 'net'
import { ServerInterface } from './interfaces/server.interface'
import { ConfigInterface } from '../e-infra/cross-cutting/utils/interfaces/config.interface'
import { Logger } from 'log4js'
import { AuthInterface } from '../e-infra/cross-cutting/authentication/interfaces/auth.interface'
import http from 'http'
import { SocketIOInterface } from './socket'

export class Server implements ServerInterface {
  private server: http.Server
  private config: ConfigInterface
  private logger: Logger

  constructor(router: Router, sockio: SocketIOInterface, auth: AuthInterface, config: ConfigInterface, logger: Logger) {
    this.config = config
    this.logger = logger

    const app = express()
    app.disable('x-powered-by')
    app.use(auth.initialize())
    app.use(router)

    this.server = http.createServer(app)

    sockio.connect(this.server)
  }

  app(): http.Server {
    return this.server
  }

  startServer(): void {
    const http = this.server.listen(this.config.port, () => {
      const { port } = http.address() as AddressInfo
      this.logger.info(`API is running on port: ${port}`)
    })
  }
}
