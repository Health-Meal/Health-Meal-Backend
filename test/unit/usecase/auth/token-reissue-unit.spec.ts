import { TokenReissueUseCase } from '../../../../src/application/domain/auth/usecase/token-reissue.usecase';
import { JwtPort, RefreshTokenPort } from '../../../../src/application/domain/auth/spi/auth.spi';
import { NotFoundException } from '@nestjs/common';

const requestTokenStub = 'testRefreshToken';
const usernameStub = 'testUsername'
const refreshTokenStub = 'testRefreshToken';
const tokenStub = {
    accessToken: 'testAccessToken',
    refreshToken: 'testRefreshToken'
}

describe('tokenReissueUseCase(유저가 토큰 재발급을 요청하는 경우)', () => {
    let tokenReissueUseCase: TokenReissueUseCase;
    let mockJwtPort: JwtPort;
    let mockRefreshTokenPort: RefreshTokenPort;

    beforeEach(() => {
        mockJwtPort = {
            receiveToken: jest.fn(),
            getSubject: jest.fn()
        };
        mockRefreshTokenPort = {
            queryRefreshTokenByUsername: jest.fn()
        };
        tokenReissueUseCase = new TokenReissueUseCase(mockJwtPort, mockRefreshTokenPort);
    });

    it('토큰이 올바르지 않으면', async () => {
        jest.spyOn(mockRefreshTokenPort, 'queryRefreshTokenByUsername').mockResolvedValue(null);

        await expect(tokenReissueUseCase.execute(requestTokenStub)).rejects.toThrowError(
            new NotFoundException('RefreshToken Not Found')
        );

        expect(mockRefreshTokenPort.queryRefreshTokenByUsername).toHaveBeenCalled()
    });

    it('토큰이 올바르면', async () => {
        jest.spyOn(mockJwtPort, 'getSubject').mockResolvedValue(usernameStub)
        jest.spyOn(mockRefreshTokenPort, 'queryRefreshTokenByUsername').mockResolvedValue(refreshTokenStub)
        jest.spyOn(mockJwtPort, 'receiveToken').mockResolvedValue(tokenStub)

        await expect(tokenReissueUseCase.execute(requestTokenStub)).resolves.toEqual(tokenStub)

        expect(mockJwtPort.getSubject).toHaveBeenCalledWith(requestTokenStub)
        expect(mockRefreshTokenPort.queryRefreshTokenByUsername).toHaveBeenCalled()
        expect(mockJwtPort.receiveToken).toHaveBeenCalled()
    })
});