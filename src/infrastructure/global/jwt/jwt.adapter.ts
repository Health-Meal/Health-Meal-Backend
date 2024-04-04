import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from '../../../application/domain/auth/dto/auth.dto';
import { JwtPort } from '../../../application/domain/auth/spi/auth.spi';
import { RefreshTokenRepository } from '../../domain/auth/persistence/repository/refresh-token.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAdapter implements JwtPort {
    constructor(
        private readonly jwtService: JwtService,
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly config: ConfigService
    ) {
    }

    async receiveToken(username: string): Promise<TokenResponse> {
        const accessToken = await this.generateToken(username, '1h', 'access');
        const refreshToken = await this.generateToken(username, '14d', 'refresh');

        await this.refreshTokenRepository.save({
            username: username,
            refreshToken: refreshToken
        });

        return {
            accessToken,
            refreshToken
        };
    }

    private async generateToken(username: string, exp: string, type: string) {
        return await this.jwtService.signAsync(
            { sub: username, type },
            { expiresIn: exp }
        );
    }

    async getSubject(token: string): Promise<string> {
        const payload = await this.jwtService.verifyAsync(token,
            { secret: this.config.get<string>('JWT_SECRET') });
        return payload.sub;
    }
}