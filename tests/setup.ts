import request from 'supertest'
import { container } from '../src/e-infra/cross-cutting/ioc/container'
import { ServerInterface } from '../src/a-app/interfaces/ServerInterface'
import { Sequelize } from 'sequelize/types'

const server = container.resolve<ServerInterface>('server')
const db = container.resolve<Sequelize>('database')

global['container'] = container
global['request'] = request(server.app())
global['db'] = db
