import { Body, Controller, Get, Headers, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignUpUseCase } from '../../../../application/domain/auth/usecase/signup.usecase';
import { LoginRequest, SignUpRequest } from './dto/auth.web.dto';
import { TokenResponse } from '../../../../application/domain/auth/dto/auth.dto';
import { LoginUseCase } from '../../../../application/domain/auth/usecase/login.usecase';
import { AuthGuard } from '@nestjs/passport';
import { GoogleLoginUseCase } from '../../../../application/domain/auth/usecase/google-login.usecase';
import { TokenReissueUseCase } from '../../../../application/domain/auth/usecase/token-reissue.usecase';

@Controller('auth')
export class AuthWebAdapter {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly googleLoginUseCase: GoogleLoginUseCase,
        private readonly tokenReissueUseCase: TokenReissueUseCase
    ) {
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    async signUp(@Body() request: SignUpRequest) {
        return this.signUpUseCase.execute(request);
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() request: LoginRequest): Promise<TokenResponse> {
        return this.loginUseCase.execute(request);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
    }

    @Get('google/redirection')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req): Promise<TokenResponse> {
        return this.googleLoginUseCase.execute(req);
    }

    @Post('reissue')
    async reissueToken(@Headers('Refresh-Token') refreshToken: string): Promise<TokenResponse> {
        return this.tokenReissueUseCase.execute(refreshToken);
    }
}