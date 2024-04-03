import { IsNotEmpty, MaxLength } from 'class-validator';

export class SignUpRequest {
    @IsNotEmpty()
    @MaxLength(60)
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;
}

export class LoginRequest {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}