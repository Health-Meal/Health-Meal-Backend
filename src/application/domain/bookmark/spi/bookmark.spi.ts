import { Bookmark } from '../domain/bookmark';

export interface BookmarkPort {
    saveBookmark(bookmark: Bookmark);

    deleteBookmark(bookmarkId: number);
}

export const BookmarkPort = Symbol('IBookmark');