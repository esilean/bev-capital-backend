import { Server } from 'http'

export interface ServerInterface {
  app(): Express.Application
  server(): Server
  startServer(): void
}
