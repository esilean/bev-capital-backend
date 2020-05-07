import request from 'supertest'
import { container } from '../src/e-infra/cross-cutting/ioc/container'
import { ServerInterface } from '../src/a-app/interfaces/ServerInterface'
import { Sequelize } from 'sequelize/types'
import cleanDb from './support/cleanDB'
import { JwtInterface } from '../src/e-infra/cross-cutting/authentication/interfaces/AuthInterface'

beforeEach(cleanDb)

export default container
export const server = container.resolve<ServerInterface>('server')
export const db = container.resolve<Sequelize>('database')
export const app = request(server.app())
export const jwt = container.resolve<JwtInterface>('jwt')
