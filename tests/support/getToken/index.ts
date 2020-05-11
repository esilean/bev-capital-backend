import { jwt } from '../../setup'
import { userFactory } from '../factory/user.factory'
import UserModel from '../../../src/e-infra/data/models/user/user.model'

export const getToken = async (userId?: string): Promise<string> => {
  let user: UserModel
  if (userId) user = await userFactory({ id: userId })
  else user = await userFactory({})
  const token = jwt.signin({
    id: user.id,
    name: user.name,
    email: user.email,
  })

  return token
}
