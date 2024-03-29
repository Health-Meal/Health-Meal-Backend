import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordEntity } from './keyword.entity';
import { Repository } from 'typeorm';
import { Keyword } from '../../../../application/domain/keyword/domain/keyword';

@Injectable()
export class KeywordMapper {
    constructor(
        @InjectRepository(KeywordEntity)
        private readonly keywordRepository: Repository<KeywordEntity>
    ) {
    }

    async toDomain(entity: KeywordEntity): Promise<Keyword> {
        return entity
            ? new Keyword(
                entity.id,
                entity.name
            ) : null;
    }
}