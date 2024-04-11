import { SaveBookmarkUseCase } from '../../../../src/application/domain/bookmark/usecase/save-bookmark.usecase';
import { BookmarkPort } from '../../../../src/application/domain/bookmark/spi/bookmark.spi';
import { Bookmark } from '../../../../src/application/domain/bookmark/domain/bookmark';
import { UserEntity } from '../../../../src/infrastructure/domain/user/persistence/user.entity';
import { ConflictException } from '@nestjs/common';

const bookmarkStub = new Bookmark(
    1,
    2,
    3
);
const userStub = new UserEntity(
    1,
    'testEmail',
    'testPassword',
    'testName',
    'local'
);
const foodIdStub = 1;

describe('saveBookmarkUseCase(유저가 음식을 북마크하는 경우)', () => {
    let saveBookmarkUseCase: SaveBookmarkUseCase;
    let mockBookmarkPort: BookmarkPort;

    beforeEach(() => {
        mockBookmarkPort = {
            queryBookmarkByUserIdAndFoodId: jest.fn(),
            saveBookmark: jest.fn(),
            deleteBookmark: jest.fn(),
            queryBookmarkByUserId: jest.fn()
        };
        saveBookmarkUseCase = new SaveBookmarkUseCase(mockBookmarkPort);
    });

    it('음식이 이미 북마크된 경우', async () => {
        jest.spyOn(mockBookmarkPort, 'queryBookmarkByUserIdAndFoodId').mockResolvedValue(bookmarkStub);

        await expect(saveBookmarkUseCase.execute(userStub, foodIdStub)).rejects.toThrowError(
            new ConflictException('Bookmark Already Exist')
        )

        expect(mockBookmarkPort.queryBookmarkByUserIdAndFoodId).toHaveBeenCalled()
    });

    it('음식이 아직 북마크되지 않은 경우', async () => {
        jest.spyOn(mockBookmarkPort, 'queryBookmarkByUserIdAndFoodId').mockResolvedValue(null)

        await expect(saveBookmarkUseCase.execute(userStub, foodIdStub)).resolves.not.toThrowError()

        expect(mockBookmarkPort.queryBookmarkByUserIdAndFoodId).toHaveBeenCalledWith(userStub.id, foodIdStub)
    })
});