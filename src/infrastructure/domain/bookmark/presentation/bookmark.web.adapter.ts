import { Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { SaveBookmarkUseCase } from '../../../../application/domain/bookmark/usecase/save-bookmark.usecase';
import { CurrentUser } from '../../../global/decorator/current-user';
import { UserEntity } from '../../user/persistence/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { DeleteBookmarkUseCase } from '../../../../application/domain/bookmark/usecase/delete-bookmark.usecase';
import { QueryBookmarkListResponse } from '../../../../application/domain/bookmark/dto/bookmark.dto';
import { QueryBookmarksUseCase } from '../../../../application/domain/bookmark/usecase/query-bookmarks.usecase';

@Controller('bookmark')
export class BookmarkWebAdapter {
    constructor(
        private readonly saveBookmarkUseCase: SaveBookmarkUseCase,
        private readonly deleteBookmarkUseCase: DeleteBookmarkUseCase,
        private readonly queryBookmarksUseCase: QueryBookmarksUseCase
    ) {
    }

    @UseGuards(AuthGuard())
    @Post('save/:id')
    async saveBookmark(@CurrentUser() user: UserEntity, @Param('id', ParseIntPipe) foodId: number): Promise<void> {
        return this.saveBookmarkUseCase.execute(user, foodId);
    }

    @UseGuards(AuthGuard())
    @HttpCode(204)
    @Delete('delete/:id')
    async deleteBookmark(@Param('id', ParseIntPipe) bookmarkId: number): Promise<void> {
        return this.deleteBookmarkUseCase.execute(bookmarkId);
    }

    @UseGuards(AuthGuard())
    @Get()
    async queryBookmarks(@CurrentUser() user: UserEntity): Promise<QueryBookmarkListResponse> {
        return this.queryBookmarksUseCase.execute(user);
    }
}