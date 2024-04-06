import { Injectable } from '@nestjs/common';
import { BookmarkEntity } from './bookmark.entity';
import { Bookmark } from '../../../../application/domain/bookmark/domain/bookmark';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/persistence/user.entity';
import { Repository } from 'typeorm';
import { FoodEntity } from '../../food/persistence/food.entity';

@Injectable()
export class BookmarkMapper {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(FoodEntity)
        private readonly foodRepository: Repository<FoodEntity>
    ) {
    }

    async toDomain(entity: BookmarkEntity): Promise<Bookmark> {
        return entity
            ? new Bookmark(
                entity.userId,
                entity.foodId,
                entity.id
            ) : null;
    }

    async toEntity(domain: Bookmark): Promise<BookmarkEntity> {
        const user = await this.userRepository.findOneBy({ id: domain.userId });
        const food = await this.foodRepository.findOneBy({ id: domain.foodId });

        return new BookmarkEntity(
            domain.id,
            user,
            food
        );
    }
}