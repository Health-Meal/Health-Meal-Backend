import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordEntity } from '../../domain/keyword/persistence/keyword.entity';

const KEYWORD_REPOSITORY = TypeOrmModule.forFeature([KeywordEntity]);

@Module({
    imports: [KEYWORD_REPOSITORY],
    controllers: [],
    providers: [],
    exports: [KEYWORD_REPOSITORY]
})

export class KeywordModule {
}
