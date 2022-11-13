import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction')
export class Transactions {
  @PrimaryGeneratedColumn({name:'transaction_id'})
  transactionID: number;

  @Column({name:'type'})
  type: string;

  @Column({name:'amount'})
  amount: number;

  // @ManyToOne(type => Accounts, otherAccount => otherAccount.accountID,{nullable:true})
  @Column({name:'otherAccount'})
  otherAccount: number;
  // otherAccount: Accounts;

  // @ManyToOne(type => Accounts, mainAccount => mainAccount.accountID)
  @Column({name:'mainAccount'})
  mainAccount: number;
  // mainAccount: Accounts;

  @Column({name:'time'})
  time: string;
}