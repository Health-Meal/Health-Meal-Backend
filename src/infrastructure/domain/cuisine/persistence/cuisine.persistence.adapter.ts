import { Injectable } from '@nestjs/common';
import { CuisinePort } from '../../../../application/domain/cuisine/spi/cuisine.spi';
import { Cuisine } from '../../../../application/domain/cuisine/domain/cuisine';
import { InjectRepository } from '@nestjs/typeorm';
import { CuisineEntity } from './cuisine.entity';
import { Repository } from 'typeorm';
import { CuisineMapper } from './cuisine.mapper';

@Injectable()
export class CuisinePersistenceAdapter implements CuisinePort {
    constructor(
        @InjectRepository(CuisineEntity)
        private readonly cuisineRepository: Repository<CuisineEntity>,
        private readonly cuisineMapper: CuisineMapper
    ) {
    }

    async queryCuisineByFoodId(foodId: number): Promise<Cuisine[]> {
        const cuisineEntity = await this.cuisineRepository
            .createQueryBuilder('cuisine')
            .where('cuisine.food_id = :food_id', { food_id: foodId })
            .getMany();

        return Promise.all(
            cuisineEntity.map((cuisine) =>
                this.cuisineMapper.toDomain(cuisine)
            )
        );
    }
}