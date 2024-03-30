import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from './food.entity';
import { Repository } from 'typeorm';
import { Food } from '../../../../application/domain/food/domain/food';

@Injectable()
export class FoodMapper {
    constructor(
        @InjectRepository(FoodEntity)
        private readonly foodRepository: Repository<FoodEntity>
    ) {
    }

    async toDomain(entity: FoodEntity): Promise<Food> {
        return entity
            ? new Food(
                entity.id,
                entity.name,
                entity.description,
                entity.image,
                entity.keywordId
            ) : null;
    }
}