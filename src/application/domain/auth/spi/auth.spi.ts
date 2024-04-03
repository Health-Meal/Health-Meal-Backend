import { TokenResponse } from '../dto/auth.dto';

export interface JwtPort {
    receiveToken(username: string): Promise<TokenResponse>;
}
export const JwtPort = Symbol('IJwtPort')