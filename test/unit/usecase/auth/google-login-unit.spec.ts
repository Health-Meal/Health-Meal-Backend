import { GoogleLoginUseCase } from '../../../../src/application/domain/auth/usecase/google-login.usecase';
import { UserPort } from '../../../../src/application/domain/user/spi/user.spi';
import { JwtPort } from '../../../../src/application/domain/auth/spi/auth.spi';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../../src/application/domain/user/domain/user';

const req = {
    user: {
        email: 'test@email.com',
        name: 'test'
    }
};
const googleUserStub = new User(
    'test@email.com',
    'testPassword',
    'test',
    'google',
    1
);
const tokenStub = {
    accessToken: 'testAccessToken',
    refreshToken: 'testRefreshToken'
};
const CONFIG_SECRET_PASSWORD = 'testSecretPassword';

describe('googleLoginUseCase(유저가 구글 OAuth 로그인하는 경우)', () => {
    let googleLoginUseCase: GoogleLoginUseCase;
    let mockUserPort: UserPort;
    let mockJwtPort: JwtPort;
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn().mockImplementation((key: string) => {
            if (key === 'SECRET_PASSWORD') {
                return CONFIG_SECRET_PASSWORD;
            }
        })
    };

    beforeEach(async () => {
        mockUserPort = {
            queryUserByEmail: jest.fn(),
            saveUser: jest.fn()
        };
        mockJwtPort = {
            receiveToken: jest.fn(),
            getSubject: jest.fn()
        };
        mockJwtPort = {
            receiveToken: jest.fn(),
            getSubject: jest.fn()
        };
        googleLoginUseCase = new GoogleLoginUseCase(mockUserPort, mockJwtPort, mockConfigService as ConfigService);
    });

    it('존재하지 않는 이메일이면', async () => {
        jest.spyOn(mockUserPort, 'queryUserByEmail').mockResolvedValue(null);
        jest.spyOn(mockUserPort, 'saveUser').mockResolvedValue(googleUserStub);
        jest.spyOn(mockJwtPort, 'receiveToken').mockResolvedValue(tokenStub);

        await expect(googleLoginUseCase.execute(req)).resolves.toEqual(tokenStub);

        expect(mockUserPort.queryUserByEmail).toHaveBeenCalled();
        expect(mockUserPort.saveUser).toHaveBeenCalled();
        expect(mockJwtPort.receiveToken).toHaveBeenCalled();
    });

    it('존재하는 이메일이면', async () => {
        jest.spyOn(mockUserPort, 'queryUserByEmail').mockResolvedValue(googleUserStub)
        jest.spyOn(mockJwtPort, 'receiveToken').mockResolvedValue(tokenStub)

        await expect(googleLoginUseCase.execute(req)).resolves.toEqual(tokenStub)

        expect(mockUserPort.queryUserByEmail).toHaveBeenCalled();
        expect(mockJwtPort.receiveToken).toHaveBeenCalled();
    })
});