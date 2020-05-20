import redis from 'redis'
import { ConfigInterface } from '../cross-cutting/utils/interfaces/config.interface'

export default class Redis {
  private config: ConfigInterface
  private redisClient: redis.RedisClient

  constructor(config: ConfigInterface) {
    this.config = config
    this.redisClient = redis.createClient(this.config.redis)
  }

  quit(cb?: redis.Callback<'OK'> | undefined): boolean {
    return this.redisClient.quit(cb)
  }

  redis(): redis.RedisClient {
    return this.redisClient
  }

  get(key: string, cb?: redis.Callback<string> | undefined): boolean {
    return this.redisClient.get(key, cb)
  }

  setex(key: string, seconds = 3600, data: string): void {
    this.redisClient.setex(key, seconds, data)
  }

  del(key: string, cb?: redis.Callback<number> | undefined): boolean {
    return this.redisClient.del(key, cb)
  }
}
