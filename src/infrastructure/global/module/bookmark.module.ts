import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkEntity } from '../../domain/bookmark/persistence/bookmark.entity';
import { BookmarkPort } from '../../../application/domain/bookmark/spi/bookmark.spi';
import { BookmarkPersistenceAdapter } from '../../domain/bookmark/persistence/bookmark.persistence.adapter';
import { SaveBookmarkUseCase } from '../../../application/domain/bookmark/usecase/save-bookmark.usecase';
import { BookmarkMapper } from '../../domain/bookmark/persistence/bookmark.mapper';
import { BookmarkWebAdapter } from '../../domain/bookmark/presentation/bookmark.web.adapter';

const BOOKMARK_PORT = { provide: BookmarkPort, useClass: BookmarkPersistenceAdapter };
const BOOKMARK_REPOSITORY = TypeOrmModule.forFeature([BookmarkEntity]);

@Module({
    imports: [BOOKMARK_REPOSITORY],
    controllers: [BookmarkWebAdapter],
    providers: [
        BOOKMARK_PORT,
        BookmarkMapper,
        SaveBookmarkUseCase
    ],
    exports: [BOOKMARK_REPOSITORY]
})
export class BookmarkModule {
}