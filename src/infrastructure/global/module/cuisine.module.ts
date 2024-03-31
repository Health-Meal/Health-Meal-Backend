import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuisineEntity } from '../../domain/cuisine/persistence/cuisine.entity';
import { CuisinePort } from '../../../application/domain/cuisine/spi/cuisine.spi';
import { CuisinePersistenceAdapter } from '../../domain/cuisine/persistence/cuisine.persistence.adapter';
import { QueryCuisineUseCase } from '../../../application/domain/cuisine/usecase/query-cuisine.usecase';
import { CuisineWebAdapter } from '../../domain/cuisine/presentation/cuisine.web.adapter';
import { CuisineMapper } from '../../domain/cuisine/persistence/cuisine.mapper';

const CUISINE_PORT = { provide: CuisinePort, useClass: CuisinePersistenceAdapter };
const CUISINE_REPOSITORY = TypeOrmModule.forFeature([CuisineEntity]);

@Module({
    imports: [CUISINE_REPOSITORY],
    controllers: [CuisineWebAdapter],
    providers: [
        CUISINE_PORT,
        CuisineMapper,
        QueryCuisineUseCase
    ],
    exports: [CUISINE_REPOSITORY]
})
export class CuisineModule {
}