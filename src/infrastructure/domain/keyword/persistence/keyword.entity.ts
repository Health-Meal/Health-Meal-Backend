import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_keyword')
export class KeywordEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: false, length: 20 })
    name: string;
}