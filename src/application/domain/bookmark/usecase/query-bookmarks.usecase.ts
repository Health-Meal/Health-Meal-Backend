import { Inject, Injectable } from '@nestjs/common';
import { BookmarkPort } from '../spi/bookmark.spi';
import { UserEntity } from '../../../../infrastructure/domain/user/persistence/user.entity';
import { QueryBookmarkListResponse } from '../dto/bookmark.dto';

@Injectable()
export class QueryBookmarksUseCase {
    constructor(
        @Inject(BookmarkPort)
        private readonly bookmarkPort: BookmarkPort
    ) {
    }

    async execute(user: UserEntity): Promise<QueryBookmarkListResponse> {
        const bookmarkList = await this.bookmarkPort.queryBookmarkByUserId(user.id);

        return {
            bookmarks: bookmarkList
        };
    }
}