import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    constructor(id: number, email: string, password: string, name: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }
}