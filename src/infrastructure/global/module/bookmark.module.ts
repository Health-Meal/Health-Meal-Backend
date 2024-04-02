import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkEntity } from '../../domain/bookmark/persistence/bookmark.entity';

const BOOKMARK_REPOSITORY = TypeOrmModule.forFeature([BookmarkEntity]);

@Module({
    imports: [BOOKMARK_REPOSITORY],
    controllers: [],
    providers: [],
    exports: [BOOKMARK_REPOSITORY]
})
export class BookmarkModule {
}