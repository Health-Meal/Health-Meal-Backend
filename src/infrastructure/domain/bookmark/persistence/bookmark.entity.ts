import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { UserEntity } from '../../user/persistence/user.entity';
import { FoodEntity } from '../../food/persistence/food.entity';
import { Bookmark } from '../../../../application/domain/bookmark/domain/bookmark';

@Entity('tbl_bookmark')
export class BookmarkEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @RelationId((bookmark: BookmarkEntity) => bookmark.user)
    userId: number;

    @ManyToOne(() => FoodEntity)
    @JoinColumn({ name: 'food_id' })
    food: FoodEntity;

    @RelationId((bookmark: BookmarkEntity) => bookmark.food)
    foodId: number;

    constructor(id: number, user: UserEntity, food: FoodEntity) {
        this.id = id;
        this.user = user;
        this.food = food;
    }
}