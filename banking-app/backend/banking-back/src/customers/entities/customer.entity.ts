import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('customers')
export class Customers extends BaseEntity {
  @PrimaryGeneratedColumn({name:'customer_id'})
  // customerID: Accounts;
  customerID: number;

  @Column({name:'first_name'})
  firstName: string;

  @Column({name:'last_name'})
  lastName: string;

  @Column({name:'email'})
  email: string;

  @Column({name:'password'})
  password: string;
}