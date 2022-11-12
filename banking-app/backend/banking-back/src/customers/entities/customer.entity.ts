import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customers {
  @PrimaryGeneratedColumn({name:'customer_id'})
  customerID: number;

  @Column({name:'first_name'})
  firstName: string;

  @Column({name:'last_name'})
  lastName: string;

  @Column({name:'email'})
  email: string;
}