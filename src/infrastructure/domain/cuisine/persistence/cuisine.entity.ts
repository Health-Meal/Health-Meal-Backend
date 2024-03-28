import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoodEntity } from '../../food/persistence/food.entity';

@Entity('tbl_cuisine')
export class CuisineEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: false, length: 15 })
    name: string;

    @ManyToOne(() => FoodEntity)
    @JoinColumn({ name: 'food_id' })
    food: string;
}