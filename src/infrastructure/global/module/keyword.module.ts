import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordEntity } from '../../domain/keyword/persistence/keyword.entity';
import { KeywordPort } from '../../../application/domain/keyword/spi/keyword.spi';
import { KeywordPersistenceAdapter } from '../../domain/keyword/persistence/keyword.persistence.adapter';
import { KeywordMapper } from '../../domain/keyword/persistence/keyword.mapper';
import { QueryKeywordUseCase } from '../../../application/domain/keyword/usecase/queryKeywordUseCase';
import { KeywordWebAdapter } from '../../domain/keyword/presentation/keyword.web.adapter';

const KEYWORD_PORT = { provide: KeywordPort, useClass: KeywordPersistenceAdapter };
const KEYWORD_REPOSITORY = TypeOrmModule.forFeature([KeywordEntity]);

@Module({
    imports: [KEYWORD_REPOSITORY],
    controllers: [KeywordWebAdapter],
    providers: [
        KEYWORD_PORT,
        KeywordMapper,
        QueryKeywordUseCase
    ],
    exports: [KEYWORD_REPOSITORY]
})

export class KeywordModule {
}
