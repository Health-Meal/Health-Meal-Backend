import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../config/redis.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SignUpUseCase } from '../../../application/domain/auth/usecase/signup.usecase';
import { AuthWebAdapter } from '../../domain/auth/presentation/auth.web.adapter';
import { JwtPort, RefreshTokenPort } from '../../../application/domain/auth/spi/auth.spi';
import { JwtAdapter } from '../jwt/jwt.adapter';
import { LoginUseCase } from '../../../application/domain/auth/usecase/login.usecase';
import { GoogleStrategy } from '../oauth/google.strategy';
import { GoogleLoginUseCase } from '../../../application/domain/auth/usecase/google-login.usecase';
import { RefreshTokenPersistenceAdapter } from '../../domain/auth/persistence/refresh-token.persistence.adapter';
import { TokenReissueUseCase } from '../../../application/domain/auth/usecase/token-reissue.usecase';

const JWT_PORT = {provide: JwtPort, useClass: JwtAdapter}
const REFRESH_TOKEN_PORT = {provide: RefreshTokenPort, useClass: RefreshTokenPersistenceAdapter}

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
        JWT_PORT,
        REFRESH_TOKEN_PORT,
        GoogleStrategy,
        SignUpUseCase,
        LoginUseCase,
        GoogleLoginUseCase,
        TokenReissueUseCase
    ],
    exports: []
})
export class AuthModule {
}