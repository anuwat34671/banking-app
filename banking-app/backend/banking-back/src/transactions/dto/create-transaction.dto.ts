import { IsNotEmpty } from 'class-validator';
export class CreateTransactionDTO {
    @IsNotEmpty()
    readonly transactionID: number;
  
    @IsNotEmpty()
    readonly type: string;
  
    @IsNotEmpty()
    readonly amount: number;

    @IsNotEmpty()
    readonly mainAccount: number;

    @IsNotEmpty()
    readonly otherAccount: number;

    @IsNotEmpty()
    readonly time: string;
}