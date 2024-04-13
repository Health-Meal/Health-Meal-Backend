import { Bookmark } from '../domain/bookmark';
import { BookMarkListResponse } from '../dto/bookmark.dto';

export interface BookmarkPort {
    saveBookmark(bookmark: Bookmark);

    deleteBookmark(bookmark: Bookmark);

    queryBookmarkByUserIdAndFoodId(userId: number, foodId: number): Promise<Bookmark>;

    queryBookmarkByUserId(userId: number): Promise<BookMarkListResponse[]>;

    queryBookmarkById(bookmarkId: number): Promise<Bookmark>;
}

export const BookmarkPort = Symbol('IBookmark');