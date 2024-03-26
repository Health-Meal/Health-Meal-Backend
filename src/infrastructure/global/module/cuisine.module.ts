import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuisineEntity } from '../../domain/cuisine/persistence/cuisine.entity';

const CUISINE_REPOSITORY = TypeOrmModule.forFeature([CuisineEntity]);

@Module({
    imports: [CUISINE_REPOSITORY],
    controllers: [],
    providers: [],
    exports: [CUISINE_REPOSITORY]
})
export class CuisineModule {
}