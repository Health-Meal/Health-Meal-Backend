import { Inject, Injectable } from '@nestjs/common';
import { TokenResponse } from '../dto/auth.dto';
import { UserPort } from '../../user/spi/user.spi';
import { JwtPort } from '../spi/auth.spi';
import { User } from '../../user/domain/user';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleLoginUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort,
        @Inject(JwtPort)
        private readonly jwtPort: JwtPort,
        private readonly config: ConfigService
    ) {
    }

    async execute(req): Promise<TokenResponse> {
        let user = await this.userPort.queryUserByEmail(req.user.email);

        if (!user) {
            user = await this.userPort.saveUser(
                new User(
                    req.user.email,
                    this.config.get('SECRET_PASSWORD'),
                    req.user.name,
                    'google'
                )
            );
        }

        return await this.jwtPort.receiveToken(user.email);
    }
}