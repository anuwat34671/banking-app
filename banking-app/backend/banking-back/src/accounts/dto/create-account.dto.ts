import { IsNotEmpty } from 'class-validator';

export class CreateAccountDTO {

    @IsNotEmpty()
    readonly account_id: number;
  
    @IsNotEmpty()
    readonly balance: number;
  
    @IsNotEmpty()
    readonly customer_id: number;
  }