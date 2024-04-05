import { Bookmark } from '../domain/bookmark';

export interface BookmarkPort {
    saveBookmark(bookmark: Bookmark);
}

export const BookmarkPort = Symbol('IBookmark');