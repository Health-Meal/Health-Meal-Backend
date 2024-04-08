import { SignUpUseCase } from '../../../src/application/domain/auth/usecase/signup.usecase';
import { UserPort } from '../../../src/application/domain/user/spi/user.spi';
import { User } from '../../../src/application/domain/user/domain/user';
import { ConflictException } from '@nestjs/common';

const userStub = new User(
    'test@email.com',
    'testPassword',
    'test',
    'local',
    1
);
const signUpRequestStub = {
    email: 'test@email.com',
    password: 'testPassword',
    name: 'test'
};

describe('SignUpUseCase(유저가 회원가입을 하는 경우)', () => {
    let signUpUseCase: SignUpUseCase;
    let mockUserPort: UserPort;

    beforeEach(() => {
        mockUserPort = {
            queryUserByEmail: jest.fn(),
            saveUser: jest.fn()
        };
        signUpUseCase = new SignUpUseCase(mockUserPort);
    });

    it('이미 존재하는 유저이면', async () => {
        jest.spyOn(mockUserPort, 'queryUserByEmail').mockResolvedValue(userStub);

        await expect(signUpUseCase.execute(signUpRequestStub)).rejects.toThrowError(
            new ConflictException('User Already Exist')
        );

        expect(mockUserPort.queryUserByEmail).toHaveBeenCalled();
    });

    it('존재하지 않는 유저이면', async () => {
        jest.spyOn(mockUserPort, 'queryUserByEmail').mockResolvedValue(null);
        jest.spyOn(mockUserPort, 'saveUser').mockResolvedValue(undefined);

        await expect(signUpUseCase.execute(signUpRequestStub)).resolves.not.toThrowError();

        expect(mockUserPort.saveUser).toHaveBeenCalled();
    });
});