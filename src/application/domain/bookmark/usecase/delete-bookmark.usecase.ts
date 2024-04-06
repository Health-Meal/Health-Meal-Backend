import { Inject, Injectable } from '@nestjs/common';
import { BookmarkPort } from '../spi/bookmark.spi';

@Injectable()
export class DeleteBookmarkUseCase {
    constructor(
        @Inject(BookmarkPort)
        private readonly bookmarkPort: BookmarkPort
    ) {
    }

    async execute(bookmarkId: number) {
        await this.bookmarkPort.deleteBookmark(bookmarkId);
    }
}