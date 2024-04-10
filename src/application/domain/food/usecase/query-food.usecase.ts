import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FoodPort } from '../spi/food.spi';
import { QueryFoodResponse } from '../dto/food.dto';

@Injectable()
export class QueryFoodUseCase {
    constructor(
        @Inject(FoodPort)
        private readonly foodPort: FoodPort
    ) {
    }

    async execute(keywordId: number): Promise<QueryFoodResponse> {
        const food = await this.foodPort.queryFoodByKeywordId(keywordId);

        if (!food) {
            throw new NotFoundException('Food Not Found')
        }

        return {
            foodId: food.id,
            name: food.name,
            description: food.description,
            image: food.image
        };
    }
}