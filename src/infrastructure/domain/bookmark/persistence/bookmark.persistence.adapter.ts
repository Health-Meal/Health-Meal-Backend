import { Injectable } from '@nestjs/common';
import { BookmarkPort } from '../../../../application/domain/bookmark/spi/bookmark.spi';
import { Bookmark } from '../../../../application/domain/bookmark/domain/bookmark';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarkEntity } from './bookmark.entity';
import { Repository } from 'typeorm';
import { BookmarkMapper } from './bookmark.mapper';
import { BookMarkListResponse } from '../../../../application/domain/bookmark/dto/bookmark.dto';

@Injectable()
export class BookmarkPersistenceAdapter implements BookmarkPort {
    constructor(
        @InjectRepository(BookmarkEntity)
        private readonly bookmarkRepository: Repository<BookmarkEntity>,
        private readonly bookmarkMapper: BookmarkMapper
    ) {
    }

    async saveBookmark(bookmark: Bookmark) {
        await this.bookmarkRepository.insert(
            await this.bookmarkMapper.toEntity(bookmark)
        );
    }

    async deleteBookmark(bookmarkId: number) {
        await this.bookmarkRepository.delete({ id: bookmarkId });
    }

    async queryBookmarkByUserIdAndFoodId(userId: number, foodId: number): Promise<Bookmark> {
        const bookmarkEntity = await this.bookmarkRepository
            .createQueryBuilder('bookmark')
            .where('bookmark.user_id = :user_id', { user_id: userId })
            .andWhere('bookmark.food_id = :food_id', { food_id: foodId })
            .getOne();

        return await this.bookmarkMapper.toDomain(bookmarkEntity);
    }

    async queryBookmarkByUserId(userId: number): Promise<BookMarkListResponse[]> {
        const bookmarkEntityList = await this.bookmarkRepository
            .createQueryBuilder('bookmark')
            .innerJoinAndSelect('bookmark.food', 'food')
            .where('bookmark.user_id = :user_id', { user_id: userId })
            .getMany();

        return bookmarkEntityList.map((bookmarkEntity) => ({
            bookmarkId: bookmarkEntity.id,
            foodId: bookmarkEntity.foodId,
            food: bookmarkEntity.food.name,
            description: bookmarkEntity.food.description,
            image: bookmarkEntity.food.image
        }));
    }

    async queryBookmarkById(bookmarkId: number): Promise<Bookmark> {
        return await this.bookmarkMapper.toDomain(
            await this.bookmarkRepository.findOneBy({ id: bookmarkId })
        );
    }
}