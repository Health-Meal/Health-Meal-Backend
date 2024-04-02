import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { SignUpRequest } from '../../../../infrastructure/domain/user/presentation/dto/auth.web.dto';
import * as bcrypt from 'bcrypt';
import { UserPort } from '../../user/spi/user.spi';
import { User } from '../../user/domain/user';

@Injectable()
export class SignUpUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort
    ) {
    }

    async execute(request: SignUpRequest) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(request.password, salt);

        const user = await this.userPort.queryUserByEmail(request.email);

        if (user) {
            throw new ConflictException('User Already Exist');
        }

        await this.userPort.saveUser(
            new User(
                request.email,
                hashPassword,
                request.name
            )
        );
    }
}