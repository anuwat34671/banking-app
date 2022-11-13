import { IsNotEmpty, IS_EMAIL, Min, MinLength } from "class-validator";

export class SignUpDTO {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;
    
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}