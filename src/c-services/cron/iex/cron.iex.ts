import cron from 'node-cron'
import moment from 'moment'

import { UserStockDomainInterface } from '../../../d-domain/interfaces/user.stocks.domain.interface'
import { CronIEXInterface } from '../interfaces/cron.interfaces'
import { ConfigInterface } from '../../../e-infra/cross-cutting/utils/interfaces/config.interface'
import { PriceIEXWorkerInterface } from '../../interfaces/workers/price.iex.worker.interface'
import { Logger } from 'log4js'

export default class CronIEX implements CronIEXInterface {
  private readonly userStockDomain: UserStockDomainInterface
  private readonly config: ConfigInterface
  private readonly logger: Logger
  private readonly priceIexWorker: PriceIEXWorkerInterface

  constructor(
    config: ConfigInterface,
    logger: Logger,
    userStockDomain: UserStockDomainInterface,
    priceIexWorker: PriceIEXWorkerInterface
  ) {
    this.config = config
    this.logger = logger
    this.userStockDomain = userStockDomain
    this.priceIexWorker = priceIexWorker
  }
  getPriceFromIEX(): void {

    const mo = this.config.marketOpen.split(':')
    const mc = this.config.marketClose.split(':')
    const intervalSecGetFromIex = this.config.intervalSecGetFromIex

    let now = moment().subtract(3, 'hours').toDate()
    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(mo[0]) - 3,
      parseInt(mo[1]),
      parseInt(mo[2])
    )
    const stopTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(mc[0]) - 3,
      parseInt(mc[1]),
      parseInt(mc[2])
    )

    cron.schedule(`*/${intervalSecGetFromIex} * * * * *`, async () => {

      try {

        now = moment().subtract(3, 'hours').toDate()
        if (now > startTime && now < stopTime) {
          // get stocks from user
          const stocks = await this.userStockDomain.getAll()
          let symbols = stocks.map((s) => s.symbol)

          //remove duplicated symbols
          const symbolsSet = new Set(symbols)
          symbols = [...symbolsSet]

          this.priceIexWorker.generatePriceIEX(symbols)
        }

      } catch (error) {
        this.logger.error(`CRON: Error IEX: Should send email or whatever... ${error}`)
      }
    })

  }
}
