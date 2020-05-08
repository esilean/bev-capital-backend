import { AppInterface } from './interfaces/app.interface'
import { ServerInterface } from './interfaces/server.interface'
import { Logger } from 'log4js'
import { Sequelize } from 'sequelize/types'

export class App implements AppInterface {
    private logger: Logger
    private server: ServerInterface
    private database: Sequelize

    constructor(logger: Logger, server: ServerInterface, database: Sequelize) {
        this.logger = logger
        this.server = server
        this.database = database
    }

    start(): void {
        try {
            this.database
                .authenticate()
                .then(() => {
                    this.logger.info(
                        'DB connection has been established successfully.'
                    )
                })
                .catch((error) => {
                    this.logger.error(`AppError: db.authenticate() ${error}`)
                })

            this.server.startServer()
        } catch (error) {
            this.logger.error(`AppError: startServer() ${error}`)
        }
    }
}
