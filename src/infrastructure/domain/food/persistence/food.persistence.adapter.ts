import { Injectable } from '@nestjs/common';
import { FoodPort } from '../../../../application/domain/food/spi/food.spi';
import { Food } from '../../../../application/domain/food/domain/food';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from './food.entity';
import { Repository } from 'typeorm';
import { FoodMapper } from './food.mapper';

@Injectable()
export class FoodPersistenceAdapter implements FoodPort {
    constructor(
        @InjectRepository(FoodEntity)
        private readonly foodRepository: Repository<FoodEntity>,
        private readonly foodMapper: FoodMapper
    ) {
    }

    async queryFoodByKeywordId(keywordId: number): Promise<Food> {
        const foodEntity = await this.foodRepository
            .createQueryBuilder('food')
            .where('food.keyword_id = :keyword_id', { keyword_id: keywordId })
            .getOne();

        return await this.foodMapper.toDomain(foodEntity);
    }
}