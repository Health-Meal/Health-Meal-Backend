import { Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { SaveBookmarkUseCase } from '../../../../application/domain/bookmark/usecase/save-bookmark.usecase';
import { CurrentUser } from '../../../global/decorator/current-user';
import { UserEntity } from '../../user/persistence/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { DeleteBookmarkUseCase } from '../../../../application/domain/bookmark/usecase/delete-bookmark.usecase';

@Controller('bookmark')
export class BookmarkWebAdapter {
    constructor(
        private readonly saveBookmarkUseCase: SaveBookmarkUseCase,
        private readonly deleteBookmarkUseCase: DeleteBookmarkUseCase
    ) {
    }

    @UseGuards(AuthGuard())
    @Post('save/:id')
    async saveBookmark(@CurrentUser() user: UserEntity, @Param('id', ParseIntPipe) foodId: number): Promise<void> {
        return this.saveBookmarkUseCase.execute(user, foodId);
    }

    @UseGuards(AuthGuard())
    @Delete('delete/:id')
    async deleteBookmark(@Param('id', ParseIntPipe) bookmarkId: number): Promise<void> {
        return this.deleteBookmarkUseCase.execute(bookmarkId);
    }
}