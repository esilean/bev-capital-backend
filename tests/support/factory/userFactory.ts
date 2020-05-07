import faker from 'faker'
import UserModel from '../../../src/e-infra/data/models/user/UserModel'

export async function userFactory({
    id = faker.random.uuid(),
    name = faker.name.firstName(),
    email = faker.internet.email(),
    password = faker.internet.password(),
}): Promise<UserModel> {
    return UserModel.create({ id, name, email, password })
}
