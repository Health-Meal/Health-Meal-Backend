import { KeywordPort } from '../../../../application/domain/keyword/spi/keyword.spi';
import { Injectable } from '@nestjs/common';
import { Keyword } from '../../../../application/domain/keyword/domain/keyword';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordEntity } from './keyword.entity';
import { Repository } from 'typeorm';
import { KeywordMapper } from './keyword.mapper';

@Injectable()
export class KeywordPersistenceAdapter implements KeywordPort {
    constructor(
        @InjectRepository(KeywordEntity)
        private readonly keywordRepository: Repository<KeywordEntity>,
        private readonly keywordMapper: KeywordMapper
    ) {
    }

    async queryKeywordByString(keyword: string): Promise<Keyword []> {
        const keywordEntities = await this.keywordRepository
            .createQueryBuilder('keyword')
            .where('keyword.name like :string', { string: `%${keyword}%` })
            .getMany();

        return Promise.all(
            keywordEntities.map(async (keyword) =>
                await this.keywordMapper.toDomain(keyword)
            )
        );
    }
}