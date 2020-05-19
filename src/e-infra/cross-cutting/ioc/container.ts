import { createContainer, InjectionMode, asClass, asFunction, asValue, Lifetime } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { CradleInterface } from './interfaces/cradle.interface'
import { App } from '../../../a-app/app'
import { Server } from '../../../a-app/server'
import Router from '../../../a-app/router'
import { config } from '../configs/config'
import { logger } from '../utils/logging/logger'
import errorHandler from '../utils/errors/error.handler'
import database from '../../data/sequelize'
import Auth from '../authentication/auth'
import Jwt from '../authentication/jwt'
import { SocketIO } from '../../../a-app/socket'
import { camelize } from '../utils/js/camelize'

const container = createContainer<CradleInterface>({
  injectionMode: InjectionMode.CLASSIC,
})

container.register({
  application: asClass(App).singleton(),
  server: asClass(Server).singleton(),
  router: asFunction(Router).singleton(),
  container: asValue(scopePerRequest(container)),
  config: asValue(config),
  logger: asFunction(logger),
  errorHandler: asValue(errorHandler),
  database: asFunction(database).singleton(),
  auth: asClass(Auth).singleton(),
  jwt: asClass(Jwt).singleton(),
  sockio: asClass(SocketIO).singleton(),
})

container.loadModules([['../../data/models/**/*.*(ts|js)', { register: asValue }]], {
  cwd: __dirname,
  formatName: function (name) {
    return camelize(name)
  },
})

container.loadModules([['../../data/repositories/**/*.*(ts|js)', { register: asClass, lifetime: Lifetime.SINGLETON }]], {
  cwd: __dirname,
  formatName: function (name) {
    return camelize(name)
  },
})

container.loadModules([['../../../d-domain/services/**/*.*(ts|js)', { register: asClass, lifetime: Lifetime.SINGLETON }]], {
  cwd: __dirname,
  formatName: function (name) {
    return camelize(name)
  },
})

container.loadModules([['../../../c-services/services/**/*.*(ts|js)', { register: asClass, lifetime: Lifetime.SCOPED }]], {
  cwd: __dirname,
  formatName: function (name) {
    return camelize(name)
  },
})

container.loadModules([['../../../c-services/workers/**/*.*(ts|js)', { register: asClass, lifetime: Lifetime.SINGLETON }]], {
  cwd: __dirname,
  formatName: function (name) {
    return camelize(name)
  },
})

export { container }
