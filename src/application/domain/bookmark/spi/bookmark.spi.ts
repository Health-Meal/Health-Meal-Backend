import { Bookmark } from '../domain/bookmark';

export interface BookmarkPort {
    saveBookmark(bookmark: Bookmark);

    deleteBookmark(bookmarkId: number);

    queryBookmarkByUserIdAndFoodId(userId: number, foodId: number): Promise<Bookmark>
}

export const BookmarkPort = Symbol('IBookmark');