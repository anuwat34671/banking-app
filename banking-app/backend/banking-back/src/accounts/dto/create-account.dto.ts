import { IsNotEmpty } from 'class-validator';

export class CreateAccountDTO {

    @IsNotEmpty()
    readonly accountID: number;
  
    @IsNotEmpty()
    readonly balance: number;
  
    @IsNotEmpty()
    readonly customerID: number;
  }