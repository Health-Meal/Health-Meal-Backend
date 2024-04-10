import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CuisinePort } from '../spi/cuisine.spi';
import { QueryCuisineResponse } from '../dto/cuisine.dto';

@Injectable()
export class QueryCuisineUseCase {
    constructor(
        @Inject(CuisinePort)
        private readonly cuisinePort: CuisinePort
    ) {
    }

    async execute(foodId: number): Promise<QueryCuisineResponse> {
        const cuisines = await this.cuisinePort.queryCuisineByFoodId(foodId);

        if (!cuisines.length) {
            throw new NotFoundException('Cuisine Not Found');
        }

        return {
            cuisines: cuisines.map((cuisine) =>
                cuisine.name
            )
        };
    }
}