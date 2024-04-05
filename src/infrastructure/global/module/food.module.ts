import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from '../../domain/food/persistence/food.entity';
import { FoodPort } from '../../../application/domain/food/spi/food.spi';
import { FoodPersistenceAdapter } from '../../domain/food/persistence/food.persistence.adapter';
import { FoodMapper } from '../../domain/food/persistence/food.mapper';
import { QueryFoodUseCase } from '../../../application/domain/food/usecase/query-food.usecase';
import { FoodWebAdapter } from '../../domain/food/presentation/food.web.adapter';

const FOOD_PORT = { provide: FoodPort, useClass: FoodPersistenceAdapter };
const FOOD_REPOSITORY = TypeOrmModule.forFeature([FoodEntity]);

@Global()
@Module({
    imports: [FOOD_REPOSITORY],
    controllers: [FoodWebAdapter],
    providers: [
        FOOD_PORT,
        FoodMapper,
        QueryFoodUseCase
    ],
    exports: [FOOD_REPOSITORY, FOOD_PORT]
})
export class FoodModule {
}