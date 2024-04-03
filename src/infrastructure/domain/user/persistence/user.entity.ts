import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LoginType } from '../../../../application/domain/user/domain/login-type';

@Entity('tbl_user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: false, length: 60 })
    email: string;

    @Column('char', { nullable: false, length: 60 })
    password: string;

    @Column('varchar', { nullable: false, length: 20 })
    name: string;

    @Column('enum', { nullable: false, enum: ['local', 'google'] })
    loginType: LoginType;

    constructor(id: number, email: string, password: string, name: string, loginType: LoginType) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.loginType = loginType;
    }
}