import { Customers } from 'src/customers/entities/customer.entity';
import { Transactions } from 'src/transactions/entities/transaction.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('accounts')
export class Accounts extends BaseEntity {
  // @OneToMany(type => Transactions, accountID => accountID.mainAccount)
  @PrimaryGeneratedColumn({name:'account_id'})
  // accountID: Transactions;
  accountID: number;

  @Column({name:'balance'})
  balance: number;

  // @OneToOne(type => Customers, customerID => customerID.customerID)
  @Column({name:'customer_id'})
  // customerID: Customers;
  customerID: number;
}