import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignUpRequest {

    @IsNotEmpty()
    @MaxLength(60)
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;
}