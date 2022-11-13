import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customers extends BaseEntity {
  // @OneToMany(type => Accounts, customerID => customerID)
  @PrimaryGeneratedColumn({name:'customer_id'})
  customerID: number;
  // customerID: Accounts;

  @Column({name:'first_name'})
  firstName: string;

  @Column({name:'last_name'})
  lastName: string;

  @Column({name:'email'})
  email: string;

  @Column({name:'password'})
  password: string;
}
