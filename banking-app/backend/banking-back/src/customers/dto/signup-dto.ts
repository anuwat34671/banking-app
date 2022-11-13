import { IsNotEmpty, Matches } from "class-validator";

export class SignUpDTO {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;
    
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,{
        message: 'Password must be minimum eight characters, at least one letter and one number'
    })
    password: string;
}