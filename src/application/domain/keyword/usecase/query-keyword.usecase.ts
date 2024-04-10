import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { KeywordPort } from '../spi/keyword.spi';
import { KeywordResponse, QueryKeywordResponse } from '../dto/keyword.dto';

@Injectable()
export class QueryKeywordUseCase {
    constructor(
        @Inject(KeywordPort)
        private readonly keywordPort: KeywordPort
    ) {
    }

    async execute(keyword: string): Promise<QueryKeywordResponse> {
        const keywords = await this.keywordPort.queryKeywordByString(keyword);

        if (!keywords.length) {
            throw new NotFoundException('Keyword Not Found');
        }

        return {
            keywords: keywords.map((keyword): KeywordResponse => ({
                keywordId: keyword.id,
                name: keyword.name
            }))
        };
    }
}