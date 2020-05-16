import { Server } from 'http'

export interface ServerInterface {
  app(): Server
  startServer(): void
}
