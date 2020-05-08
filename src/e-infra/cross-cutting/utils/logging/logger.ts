import { configure, getLogger, Logger } from 'log4js'
import { ConfigInterface } from '../interfaces/config.interface'

export const logger = function (config: ConfigInterface): Logger {
    const file = Object.create(config.logging)
    configure(file)
    const logger = getLogger()
    logger.level = 'debug'
    return logger
}
