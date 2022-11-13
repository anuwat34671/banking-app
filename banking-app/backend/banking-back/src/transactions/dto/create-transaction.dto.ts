import { IsNotEmpty } from 'class-validator';
export class CreateTransactionDTO {

    readonly transactionID: number;
    
    @IsNotEmpty()
    readonly type: string;
  
    @IsNotEmpty()
    readonly amount: number;

    @IsNotEmpty()
    readonly mainAccount: number;

    readonly otherAccount: number;

    readonly time: string;
}