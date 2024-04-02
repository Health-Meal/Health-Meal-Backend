import { Module } from '@nestjs/common';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { KeywordModule } from './infrastructure/global/module/keyword.module';
import { FoodModule } from './infrastructure/global/module/food.module';
import { CuisineModule } from './infrastructure/global/module/cuisine.module';
import { UserModule } from './infrastructure/global/module/user.module';
import { BookmarkModule } from './infrastructure/global/module/bookmark.module';
import { AuthModule } from './infrastructure/global/module/auth.module';

@Module({
    imports: [
        KeywordModule,
        FoodModule,
        CuisineModule,
        UserModule,
        AuthModule,
        BookmarkModule,
        TypeormConfigModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class AppModule {
}