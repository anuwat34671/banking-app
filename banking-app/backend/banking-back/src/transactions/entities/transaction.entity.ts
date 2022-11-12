import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction')
export class Transactions {
  @PrimaryGeneratedColumn({name:'transaction_id'})
  transactionID: number;

  @Column({name:'type'})
  type: string;

  @Column({name:'amount'})
  amount: number;

  @Column({name:'otherAccount'})
  otherAccount: number;

  @Column({name:'mainAccount'})
  mainAccount: number;

  @Column({name:'time'})
  time: string;
}