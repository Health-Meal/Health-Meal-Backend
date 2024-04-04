import { TokenResponse } from '../dto/auth.dto';

export interface JwtPort {
    receiveToken(username: string): Promise<TokenResponse>;
    getSubject(token: string): Promise<string>
}

export interface RefreshTokenPort {
    queryRefreshTokenByUsername(username: string): Promise<string>;
}

export const JwtPort = Symbol('IJwtPort');
export const RefreshTokenPort = Symbol('IRefreshTokenPort');