export class User {
    id?: number;

    email: string;

    password: string;

    name: string;

    constructor(email: string, password: string, name: string, id?: number) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }
}