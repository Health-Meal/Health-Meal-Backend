import { LoginUseCase } from '../../../../src/application/domain/auth/usecase/login.usecase';
import { UserPort } from '../../../../src/application/domain/user/spi/user.spi';
import { JwtPort } from '../../../../src/application/domain/auth/spi/auth.spi';
import { User } from '../../../../src/application/domain/user/domain/user';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const localUserStub = new User(
    'test@email.com',
    'testPassword',
    'test',
    'local',
    1
);
const googleUserStub = new User(
    'test@email.com',
    'testPassword',
    'test',
    'google',
    1
);
const loginRequestStub = {
    email: 'test@email.com',
    password: 'testPassword'
};
const tokenStub = {
    accessToken: 'testAccessToken',
    refreshToken: 'testRefreshToken'
}

describe('loginUseCase(유저가 로그인을 하는 경우)', () => {
    let loginUseCase: LoginUseCase;
    let mockUserPort: UserPort;
    let mockJwtPort: JwtPort;

    beforeEach(() => {
        mockUserPort = {
            queryUserByEmail: jest.fn(),
            saveUser: jest.fn()
        };
        mockJwtPort = {
            receiveToken: jest.fn(),
            getSubject: jest.fn()
        }
        loginUseCase = new LoginUseCase(mockUserPort, mockJwtPort);
    });

    it('존재하지 않는 이메일이면', async () => {
        jest.spyOn(mockUserPort, 'queryUserByEmail').mockResolvedValue(undefined);

        await expect(loginUseCase.execute(loginRequestStub)).rejects.toThrowError(
            new NotFoundException('User Not Found')
        );

        expect(mockUserPort.queryUserByEmail).toHaveBeenCalled();
    });

    it('유저의 loginType이 local이 아니면', async () => {
        jest.spyOn(mockUserPort, 'queryUserByEmail').mockResolvedValue(googleUserStub);

        await expect(loginUseCase.execute(loginRequestStub)).rejects.toThrowError(
            new BadRequestException(`${googleUserStub.loginType} login`)
        );

        expect(mockUserPort.queryUserByEmail).toHaveBeenCalled();
    });

    describe ('올바른 이메일, 유저의 loginType이 local인 경우', () => {

        it('비밀번호가 일치하지 않는다면', async () => {
            jest.spyOn(mockUserPort, 'queryUserByEmail').mockResolvedValue(localUserStub);
            jest.spyOn(bcrypt, 'compare').mockReturnValue(false as any);

            await expect(loginUseCase.execute(loginRequestStub)).rejects.toThrowError(
                new UnauthorizedException('Password Mismatch Exception')
            );

            expect(mockUserPort.queryUserByEmail).toHaveBeenCalled();
            expect(bcrypt.compare).toHaveBeenCalledWith(loginRequestStub.password, localUserStub.password);
        });

        it('비밀번호가 일치한다면', async () => {
            jest.spyOn(mockUserPort, 'queryUserByEmail').mockResolvedValue(localUserStub)
            jest.spyOn(bcrypt, 'compare').mockReturnValue(true as any)
            jest.spyOn(mockJwtPort, 'receiveToken').mockResolvedValue(tokenStub)

            await expect(loginUseCase.execute(loginRequestStub)).resolves.not.toThrowError()

            expect(mockUserPort.queryUserByEmail).toHaveBeenCalled();
            expect(bcrypt.compare).toHaveBeenCalledWith(loginRequestStub.password, localUserStub.password);
            expect(mockJwtPort.receiveToken).toHaveBeenCalled()
        })
    })
});