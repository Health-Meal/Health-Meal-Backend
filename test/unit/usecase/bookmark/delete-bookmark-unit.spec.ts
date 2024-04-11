import { DeleteBookmarkUseCase } from '../../../../src/application/domain/bookmark/usecase/delete-bookmark.usecase';
import { BookmarkPort } from '../../../../src/application/domain/bookmark/spi/bookmark.spi';
import { Bookmark } from '../../../../src/application/domain/bookmark/domain/bookmark';
import { NotFoundException } from '@nestjs/common';

const bookmarkIdStub = 1;
const bookmarkStub = new Bookmark(
    1,
    2,
    3
);

describe('deleteBookmarkUseCase(유저가 북마크된 음식을 북마크 제거하는 경우)', () => {
    let deleteBookmarkUseCase: DeleteBookmarkUseCase;
    let mockBookmarkPort: BookmarkPort;

    beforeEach(() => {
        mockBookmarkPort = {
            queryBookmarkById: jest.fn(),
            deleteBookmark: jest.fn(),
            saveBookmark: jest.fn(),
            queryBookmarkByUserIdAndFoodId: jest.fn(),
            queryBookmarkByUserId: jest.fn()
        };
        deleteBookmarkUseCase = new DeleteBookmarkUseCase(mockBookmarkPort);
    });

    it('bookmarkId가 존재하지 않으면', async () => {
        jest.spyOn(mockBookmarkPort, 'queryBookmarkById').mockResolvedValue(null);

        await expect(deleteBookmarkUseCase.execute(bookmarkIdStub)).rejects.toThrowError(
            new NotFoundException('Bookmark Not Found')
        );

        expect(mockBookmarkPort.queryBookmarkById).toHaveBeenCalled();
    });

    it('bookmarkId가 올바르면', async () => {
        jest.spyOn(mockBookmarkPort, 'queryBookmarkById').mockResolvedValue(bookmarkStub);
        jest.spyOn(mockBookmarkPort, 'deleteBookmark').mockReturnValue(null)

        await expect(deleteBookmarkUseCase.execute(bookmarkIdStub)).resolves.not.toThrowError()

        expect(mockBookmarkPort.queryBookmarkById).toHaveBeenCalled()
        expect(mockBookmarkPort.deleteBookmark).toHaveBeenCalled()
    });
});