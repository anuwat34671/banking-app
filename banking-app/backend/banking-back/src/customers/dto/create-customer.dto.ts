import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDTO {

  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly account_id: number;
}