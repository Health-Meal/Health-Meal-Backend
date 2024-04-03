import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserPort } from '../../user/spi/user.spi';
import { JwtPort } from '../spi/auth.spi';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from '../../../../infrastructure/domain/auth/presentation/dto/auth.web.dto';
import { TokenResponse } from '../dto/auth.dto';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort,
        @Inject(JwtPort)
        private readonly jwtPort: JwtPort
    ) {
    }

    async execute(request: LoginRequest): Promise<TokenResponse> {
        const user = await this.userPort.queryUserByEmail(request.email);

        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        if (user.loginType !== 'local') {
            throw new BadRequestException(`${user.loginType} login`);
        }

        if (!await bcrypt.compare(request.password, user.password)) {
            throw new UnauthorizedException('Password Mismatch Exception');
        }

        const token = await this.jwtPort.receiveToken(user.email);

        return {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        };
    }
}