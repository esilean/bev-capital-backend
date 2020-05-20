import request from 'supertest'
import { container } from '../src/e-infra/cross-cutting/ioc/container'
import { ServerInterface } from '../src/a-app/interfaces/server.interface'
import { JwtInterface } from '../src/e-infra/cross-cutting/authentication/interfaces/auth.interface'
import { Sequelize } from 'sequelize/types'
import { RedisInterface } from '../src/e-infra/redis/interfaces/redis.interface'

const server = container.resolve<ServerInterface>('server')
const redisClient = container.resolve<RedisInterface>('redisClient')
export const db = container.resolve<Sequelize>('database')

afterAll(async () => {
  await db.close()
  redisClient.quit()
  server.app().close(() => {
    container.dispose()
  })
})

export default container
export const app = request(server.app())
export const jwt = container.resolve<JwtInterface>('jwt')
