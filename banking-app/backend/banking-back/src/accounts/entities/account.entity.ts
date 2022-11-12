import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn({name:'account_id'})
  accountID: number;

  @Column({name:'balance'})
  balance: number;

  @Column({name:'customer_id'})
  customerID: number;
}