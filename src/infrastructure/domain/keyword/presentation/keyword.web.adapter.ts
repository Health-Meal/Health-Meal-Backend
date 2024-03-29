import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { QueryKeywordUseCase } from '../../../../application/domain/keyword/usecase/queryKeywordUseCase';
import { QueryKeywordResponse } from '../../../../application/domain/keyword/dto/keyword.dto';
import { ValidateKeywordPipe } from '../../../global/pipe/validate.keyword.pipe';

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