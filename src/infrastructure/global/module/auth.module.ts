import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../config/redis.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SignUpUseCase } from '../../../application/domain/auth/usecase/signup.usecase';
import { AuthWebAdapter } from '../../domain/auth/presentation/auth.web.adapter';

@Module({
    imports: [
        RedisCacheModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET')
            })
        }),
        PassportModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                defaultStrategy: 'jwt'
            })
        })
    ],
    controllers: [AuthWebAdapter],
    providers: [
        SignUpUseCase
    ],
    exports: []
})
export class AuthModule {
}