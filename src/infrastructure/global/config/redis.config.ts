import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

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
    providers: [],
    exports: []
})
export class RedisCacheModule {
}