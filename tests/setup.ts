import request from 'supertest'
import { container } from '../src/e-infra/cross-cutting/ioc/container'
import { ServerInterface } from '../src/a-app/interfaces/server.interface'
import { JwtInterface } from '../src/e-infra/cross-cutting/authentication/interfaces/auth.interface'
import { Sequelize } from 'sequelize/types'
import { cleanOthers } from './support/db'

const server = container.resolve<ServerInterface>('server')
export const db = container.resolve<Sequelize>('database')

beforeAll(cleanOthers)

afterAll(() => {
  db.close()
  server.server().close(() => {
    container.dispose()
  })
})

export default container
export const app = request(server.app())
export const jwt = container.resolve<JwtInterface>('jwt')
