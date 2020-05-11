/* eslint-disable @typescript-eslint/no-explicit-any */
interface ConfigInterface {
  env: string
  db: Record<string, any>
  port: string | number
  logging: LogginInterface
  authSecret: string | undefined
}

interface LogginInterface {
  appenders: Record<string, any>
  categories: Record<string, any>
}

export { ConfigInterface }
