import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUseCase } from '../../../../application/domain/auth/usecase/signup.usecase';
import { SignUpRequest } from './dto/auth.web.dto';

@Controller('auth')
export class AuthWebAdapter {
    constructor(
        private readonly signUpUseCase: SignUpUseCase
    ) {
    }

    @Post('register')
    async signUp(@Body() request: SignUpRequest) {
        return this.signUpUseCase.execute(request);
    }
}