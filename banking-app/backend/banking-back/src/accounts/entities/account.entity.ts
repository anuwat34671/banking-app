import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class Accounts extends BaseEntity {
  // @OneToMany(type => Transactions, accountID => accountID.mainAccount)
  @PrimaryGeneratedColumn({name:'account_id'})
  accountID: number;
  //accountID: Transactions;

  @Column({name:'balance'})
  balance: number;

  // @ManyToOne(type => Customers, customerID => customerID.customerID)
  @Column({name:'customer_id'})
  customerID: number;
  // customerID: Customers;
}