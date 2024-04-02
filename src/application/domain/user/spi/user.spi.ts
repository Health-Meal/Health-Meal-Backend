import { User } from '../domain/user';

export interface UserPort {
    queryUserByEmail(email: string): Promise<User>;
    saveUser (user: User): Promise<void>
}

export const UserPort = Symbol('IUserPort');