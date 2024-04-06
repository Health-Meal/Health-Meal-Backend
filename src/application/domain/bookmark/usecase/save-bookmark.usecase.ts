import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { BookmarkPort } from '../spi/bookmark.spi';
import { UserEntity } from '../../../../infrastructure/domain/user/persistence/user.entity';
import { Bookmark } from '../domain/bookmark';

@Injectable()
export class SaveBookmarkUseCase {
    constructor(
        @Inject(BookmarkPort)
        private readonly bookmarkPort: BookmarkPort
    ) {
    }

    async execute(userEntity: UserEntity, foodId: number) {
        const bookmark = await this.bookmarkPort.queryBookmarkByUserIdAndFoodId(userEntity.id, foodId);
        
        if (bookmark) {
            throw new ConflictException('Bookmark Already Exist');
        }

        await this.bookmarkPort.saveBookmark(
            new Bookmark(
                userEntity.id,
                foodId
            )
        );
    }
}