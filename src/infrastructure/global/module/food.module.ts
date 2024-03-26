import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from '../../domain/food/persistence/food.entity';

const FOOD_REPOSITORY = TypeOrmModule.forFeature([FoodEntity]);

@Module({
    imports: [FOOD_REPOSITORY],
    controllers: [],
    providers: [],
    exports: [FOOD_REPOSITORY]
})
export class FoodModule {
}