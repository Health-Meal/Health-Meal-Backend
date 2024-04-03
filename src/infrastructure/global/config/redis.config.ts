import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { RefreshTokenRepository } from '../../domain/auth/persistence/repository/refresh-token.repository';

@Module({
    imports: [
        CacheModule.registerAsync<RedisClientOptions>({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                store: await redisStore({
                    socket: {
                        host: config.get('REDIS_HOST'),
                        port: config.get('REDIS_PORT')
                    },
                    password: config.get('REDIS_PASSWORD')
                })
            })
        })
    ],
    providers: [RefreshTokenRepository],
    exports: [RefreshTokenRepository]
})
export class RedisCacheModule {
}