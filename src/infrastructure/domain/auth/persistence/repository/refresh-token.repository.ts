import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenEntity } from '../refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        private readonly configService: ConfigService
    ) {
    }

    async save(refreshToken: RefreshTokenEntity) {
        await this.cacheManager.set(refreshToken.username, refreshToken.refreshToken, this.configService.get('REFRESH_EXP'));
    }

    async get(key: string): Promise<string> {
        return await this.cacheManager.get(key);
    }
}