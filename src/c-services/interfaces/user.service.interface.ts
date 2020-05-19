import User from '../../d-domain/entities/user'

export interface GetAllUserServiceInterface {
  execute(): Promise<User[]>
}

export interface GetUserServiceInterface {
  execute(id: string): Promise<User>
}

export interface CreateUserServiceInterface {
  execute(body: User): Promise<User>
}

export interface DestroyUserServiceInterface {
  execute(id: string): Promise<boolean>
}
