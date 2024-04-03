import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUseCase } from '../../../../application/domain/auth/usecase/signup.usecase';
import { LoginRequest, SignUpRequest } from './dto/auth.web.dto';
import { TokenResponse } from '../../../../application/domain/auth/dto/auth.dto';
import { LoginUseCase } from '../../../../application/domain/auth/usecase/login.usecase';

@Controller('user')
export class AuthWebAdapter {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly loginUseCase: LoginUseCase
    ) {
    }

    @Post('register')
    async signUp(@Body() request: SignUpRequest) {
        return this.signUpUseCase.execute(request);
    }

    @Post('auth')
    async login(@Body() request: LoginRequest): Promise<TokenResponse> {
        return this.loginUseCase.execute(request);
    }
}