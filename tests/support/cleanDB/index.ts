import { db } from '../../setup'

export default (): Promise<unknown[]> => db && db.truncate({ cascade: true })
