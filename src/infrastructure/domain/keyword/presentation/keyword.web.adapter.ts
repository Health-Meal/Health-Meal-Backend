import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { QueryKeywordResponse } from '../../../../application/domain/keyword/dto/keyword.dto';
import { ValidateKeywordPipe } from '../../../global/pipe/validate.keyword.pipe';
import { QueryKeywordUseCase } from '../../../../application/domain/keyword/usecase/query-keyword.usecase';

@Controller('keywords')
export class KeywordWebAdapter {
    constructor(
        private readonly queryKeywordUseCase: QueryKeywordUseCase
    ) {
    }

    @Get()
    @UsePipes(ValidateKeywordPipe)
    async queryKeyword(@Query('keyword') keyword: string): Promise<QueryKeywordResponse> {
        return this.queryKeywordUseCase.execute(keyword);
    }
}