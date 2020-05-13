import { container } from '../src/e-infra/cross-cutting/ioc/container'
import { cleanUsers } from './support/db'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async () => {
  container.resolve('database')
  cleanUsers()
}
