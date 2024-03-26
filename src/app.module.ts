import { Module } from '@nestjs/common';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { KeywordModule } from './infrastructure/global/module/keyword.module';
import { FoodModule } from './infrastructure/global/module/food.module';
import { CuisineModule } from './infrastructure/global/module/cuisine.module';

@Module({
    imports: [
        KeywordModule,
        FoodModule,
        CuisineModule,
        TypeormConfigModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class AppModule {
}