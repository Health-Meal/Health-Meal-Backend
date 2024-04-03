import { LoginType } from './login-type';

export class User {
    id?: number;

    email: string;

    password: string;

    name: string;

    loginType: LoginType;

    constructor(email: string, password: string, name: string, loginType: LoginType, id?: number) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.loginType = loginType;
    }
}