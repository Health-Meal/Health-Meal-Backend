import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QueryCuisineUseCase } from '../../../../application/domain/cuisine/usecase/query-cuisine.usecase';
import { QueryCuisineResponse } from '../../../../application/domain/cuisine/dto/cuisine.dto';

@Controller('cuisine')
export class CuisineWebAdapter {
    constructor(
        private readonly queryCuisineUseCase: QueryCuisineUseCase
    ) {
    }

    @Get(':id')
    async queryCuisine(@Param('id', ParseIntPipe) foodId: number): Promise<QueryCuisineResponse> {
        return this.queryCuisineUseCase.execute(foodId);
    }
}