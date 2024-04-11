import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BookmarkPort } from '../spi/bookmark.spi';

@Injectable()
export class DeleteBookmarkUseCase {
    constructor(
        @Inject(BookmarkPort)
        private readonly bookmarkPort: BookmarkPort
    ) {
    }

    async execute(bookmarkId: number) {
        const bookmark = await this.bookmarkPort.queryBookmarkById(bookmarkId);

        if (!bookmark) {
            throw new NotFoundException('Bookmark Not Found');
        }

        await this.bookmarkPort.deleteBookmark(bookmarkId);
    }
}