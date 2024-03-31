import { Injectable } from '@nestjs/common';
import { CuisineEntity } from './cuisine.entity';
import { Cuisine } from '../../../../application/domain/cuisine/domain/cuisine';

@Injectable()
export class CuisineMapper {

    async toDomain(entity: CuisineEntity): Promise<Cuisine> {
        return entity
            ? new Cuisine(
                entity.id,
                entity.name,
                entity.foodId
            ) : null;
    }
}