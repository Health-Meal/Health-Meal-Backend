import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QueryFoodUseCase } from '../../../../application/domain/food/usecase/query-food.usecase';
import { QueryFoodResponse } from '../../../../application/domain/food/dto/food.dto';

@Controller('food')
export class FoodWebAdapter {
    constructor(
        private readonly queryFoodUseCase: QueryFoodUseCase
    ) {
    }

    @Get('/:id')
    async queryFood(@Param('id', ParseIntPipe) keywordId: number): Promise<QueryFoodResponse> {
        return this.queryFoodUseCase.execute(keywordId);
    }
}