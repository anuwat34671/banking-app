import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn({name:'account_id'})
  accountID: number;

  @Column({name:'type'})
  type: string;

  @Column({name:'last_name'})
  lastName: string;
}