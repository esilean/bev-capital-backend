import cron from 'node-cron'
import { UserStockDomainInterface } from '../../../d-domain/interfaces/user.stocks.domain.interface'
import { CronFinnHubInterface } from '../interfaces/cron.interfaces'
import moment from 'moment'
import { ConfigInterface } from '../../../e-infra/cross-cutting/utils/interfaces/config.interface'
import { PriceFinnhubWorkerInterface } from '../../interfaces/workers/price.finnhub.worker.interface copy'
import { Logger } from 'log4js'

export default class CronFinnhub implements CronFinnHubInterface {
  private readonly userStockDomain: UserStockDomainInterface
  private readonly config: ConfigInterface
  private readonly priceFinnhubWorker: PriceFinnhubWorkerInterface
  private readonly logger: Logger

  constructor(
    config: ConfigInterface,
    logger: Logger,
    userStockDomain: UserStockDomainInterface,
    priceFinnhubWorker: PriceFinnhubWorkerInterface
  ) {
    this.userStockDomain = userStockDomain
    this.config = config
    this.logger = logger
    this.priceFinnhubWorker = priceFinnhubWorker
  }
  getPriceFromFinnHub(): void {
    try {
      const mo = this.config.marketOpen.split(':')
      const mc = this.config.marketClose.split(':')
      const intervalSecGetFromFinnhub = this.config.intervalSecGetFromFinnhub

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

      cron.schedule(`*/${intervalSecGetFromFinnhub} * * * * *`, async () => {
        now = moment().subtract(3, 'hours').toDate()
        if (now > startTime && now < stopTime) {
          // get stocks from user
          const stocks = await this.userStockDomain.getAll()
          const symbols = stocks.map((s) => s.symbol)

          symbols.forEach(async (s) => {
            //sleep for 1 second cause finnhub provider does not allowed many calls... should use websocket
            await new Promise((r) => setTimeout(r, 1000))
            this.priceFinnhubWorker.generatePriceFinnhub(s)
          })
        }
      })
    } catch (error) {
      this.logger.error(`CRON: Error Finnhub: Should send email or whatever... ${error}`)
    }
  }
}
