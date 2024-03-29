import { Inject, Injectable } from '@nestjs/common';
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

        return {
            keywords: keywords.map((keyword): KeywordResponse => {
                return {
                    id: keyword.id,
                    name: keyword.name
                };
            })
        };
    }
}