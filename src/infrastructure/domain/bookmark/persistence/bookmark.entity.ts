import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/persistence/user.entity';
import { FoodEntity } from '../../food/persistence/food.entity';

@Entity('tbl_bookmark')
export class BookmarkEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => FoodEntity)
    @JoinColumn({ name: 'food_id' })
    food: FoodEntity;
}