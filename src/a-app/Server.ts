import express, { Router, Application } from 'express'
import { AddressInfo } from 'net'
import { ServerInterface } from './interfaces/server.interface'
import { ConfigInterface } from '../e-infra/cross-cutting/utils/interfaces/config.interface'
import { Logger } from 'log4js'
import { AuthInterface } from '../e-infra/cross-cutting/authentication/interfaces/auth.interface'

export class Server implements ServerInterface {
  private appex: express.Application
  private config: ConfigInterface
  private logger: Logger

  constructor(router: Router, auth: AuthInterface, config: ConfigInterface, logger: Logger) {
    this.config = config
    this.logger = logger

    this.appex = express()
    this.appex.disable('x-powered-by')

    this.appex.use(auth.initialize())

    this.appex.use(router)
  }

  app(): Application {
    return this.appex
  }

  startServer(): void {
    const http = this.appex.listen(this.config.port, () => {
      const { port } = http.address() as AddressInfo
      this.logger.info(`API is running on port: ${port}`)
    })
  }
}
