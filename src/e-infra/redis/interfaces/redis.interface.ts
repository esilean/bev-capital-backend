import redis from 'redis'

export interface RedisInterface {
  redis(): redis.RedisClient
  quit(cb?: redis.Callback<'OK'> | undefined): boolean
  get(key: string, cb?: redis.Callback<string> | undefined): boolean
  setex(key: string, seconds: number, data: string): void
  del(key: string, cb?: redis.Callback<number> | undefined): boolean
}
