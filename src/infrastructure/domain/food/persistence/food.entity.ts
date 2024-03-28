import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { KeywordEntity } from '../../keyword/persistence/keyword.entity';

@Entity('tbl_food')
export class FoodEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: false, length: 10 })
    name: string;

    @Column('varchar', { nullable: false, length: 200 })
    description: string;

    @Column('varchar', { nullable: false, length: 3000 })
    image: string;

    @ManyToOne(() => KeywordEntity)
    @JoinColumn({ name: 'keyword_id' })
    keyword: KeywordEntity;
}