import { container } from '../src/e-infra/cross-cutting/ioc/container'
import { cleanUsers, cleanOthers } from './support/db'

export default async (): Promise<void> => {
  await container.resolve('database')
  await cleanOthers()
  await cleanUsers()
}
