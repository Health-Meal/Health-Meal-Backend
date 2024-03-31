import { Inject, Injectable } from '@nestjs/common';
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

        return {
            cuisines: cuisines.map((cuisine) =>
                cuisine.name
            )
        };
    }
}