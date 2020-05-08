import { container } from './e-infra/cross-cutting/ioc/container'
import { AppInterface } from './a-app/interfaces/app.interface'

const app = container.resolve<AppInterface>('application')

app.start()
