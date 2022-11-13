import { Accounts } from 'src/accounts/entities/account.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('transaction')
export class Transactions {
  @PrimaryGeneratedColumn({name:'transaction_id'})
  transactionID: number;

  @Column({name:'type'})
  type: string;

  @Column({name:'amount'})
  amount: number;

  // @Column({name:'otherAccount'})
  // otherAccount: number;

  // @Column({name:'mainAccount'})
  // mainAccount: number;

  // @ManyToOne(type => Accounts, otherAccount => otherAccount.accountID,{nullable:true})
  // otherAccount: Accounts;
  @Column({name:'otherAccount'})
  otherAccount: number;

  // @ManyToOne(type => Accounts, mainAccount => mainAccount.accountID)
  // mainAccount: Accounts;

  @Column({name:'mainAccount'})
  mainAccount: number;

  @Column({name:'time'})
  time: string;
}