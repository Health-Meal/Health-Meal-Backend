import { QueryBookmarksUseCase } from '../../../../src/application/domain/bookmark/usecase/query-bookmarks.usecase';
import { BookmarkPort } from '../../../../src/application/domain/bookmark/spi/bookmark.spi';
import { User } from '../../../../src/application/domain/user/domain/user';
import { UserEntity } from '../../../../src/infrastructure/domain/user/persistence/user.entity';

let userStub = new UserEntity(
    1,
    'testEmail',
    'testpassword',
    'testName',
    'local'
);
let bookmarkListStub = [
    {
        bookmarkId: 1,
        foodId: 2,
        food: 'testFood',
        description: 'testDescription',
        image: 'testImage'
    },
    {
        bookmarkId: 2,
        foodId: 3,
        food: 'testFood',
        description: 'testDescription',
        image: 'testImage'
    }
];
let bookmarkListResponseStub = {
    bookmarks: bookmarkListStub
};

describe('queryBookmarkUseCase(유저가 북마크한 리스트를 확인하는 경우)', () => {
    let queryBookmarksUseCase: QueryBookmarksUseCase;
    let mockBookmarkPort: BookmarkPort;

    beforeEach(() => {
        mockBookmarkPort = {
            queryBookmarkByUserId: jest.fn(),
            queryBookmarkByUserIdAndFoodId: jest.fn(),
            saveBookmark: jest.fn(),
            deleteBookmark: jest.fn(),
            queryBookmarkById: jest.fn()
        };
        queryBookmarksUseCase = new QueryBookmarksUseCase(mockBookmarkPort);
    });

    it('유저 ID에 해당하는 북마크가 없다면 빈 배열을 반환한다', async () => {
        jest.spyOn(mockBookmarkPort, 'queryBookmarkByUserId').mockResolvedValue([]);

        await expect(queryBookmarksUseCase.execute(userStub)).resolves.not.toThrowError();

        expect(mockBookmarkPort.queryBookmarkByUserId).toHaveBeenCalled();
    });

    it('유저 ID에 해당하는 북마크가 있다면 북마크 리스트를 반환한다', async () => {
        jest.spyOn(mockBookmarkPort, 'queryBookmarkByUserId').mockResolvedValue(bookmarkListStub);

        await expect(queryBookmarksUseCase.execute(userStub)).resolves.toEqual(bookmarkListResponseStub);

        expect(mockBookmarkPort.queryBookmarkByUserId).toHaveBeenCalled();
    });
});