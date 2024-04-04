import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtPort, RefreshTokenPort } from '../spi/auth.spi';
import { TokenResponse } from '../dto/auth.dto';

@Injectable()
export class TokenReissueUseCase {
    constructor(
        @Inject(JwtPort)
        private readonly jwtPort: JwtPort,
        @Inject(RefreshTokenPort)
        private readonly refreshTokenPort: RefreshTokenPort
    ) {
    }

    async execute(token: string): Promise<TokenResponse> {
        const username = await this.jwtPort.getSubject(token);
        const refreshToken = await this.refreshTokenPort.queryRefreshTokenByUsername(username);

        if (token !== refreshToken) {
            throw new NotFoundException('RefreshToken Not Found');
        }

        return await this.jwtPort.receiveToken(username);
    }
}