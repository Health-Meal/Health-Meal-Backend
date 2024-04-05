import { Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { SaveBookmarkUseCase } from '../../../../application/domain/bookmark/usecase/save-bookmark.usecase';
import { CurrentUser } from '../../../global/decorator/current-user';
import { UserEntity } from '../../user/persistence/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookmark')
export class BookmarkWebAdapter {
    constructor(
        private readonly saveBookmarkUseCase: SaveBookmarkUseCase
    ) {
    }

    @UseGuards(AuthGuard())
    @Post('save/:id')
    async saveBookmark(@CurrentUser() user: UserEntity, @Param('id', ParseIntPipe) foodId: number): Promise<void> {
        return this.saveBookmarkUseCase.execute(user, foodId);
    }
}