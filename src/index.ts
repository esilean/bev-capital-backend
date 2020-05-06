import { container } from './e-infra/cross-cutting/ioc/container'
import { AppInterface } from './a-app/interfaces/AppInterface'

const app = container.resolve<AppInterface>('application')

app.start()
