import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customers } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { SignUpDTO } from './dto/signup-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>,
  ) {}

  async signUp(signUpDTO: SignUpDTO): Promise<Customers> {
    try{
      const { firstName, lastName, email, password } = signUpDTO
      const hashPwd = await bcrypt.hashSync(password, 15);
      const customer = this.customersRepository.create({ firstName, lastName, email, password:hashPwd })
      return await this.customersRepository.save(customer);
    } catch(e) {
      throw new ConflictException("Username has been already used.")
    }
  }

  findByEmail(email: string) {
    const a = this.customersRepository.findOne({ where: {email: email}});
    console.log("This is A " + a);
    return a;
  }

  findOneByID(id: number) {
    return this.customersRepository.findOne({ where: {customerID: id}});
  }

  async createCustomer(createCustomer: SignUpDTO): Promise<Customers>{
    const customer = await this.customersRepository.save(createCustomer);
    return customer;
  }

  async getAllCustomers(): Promise<Customers[]> {
    const customer = await this.customersRepository.find();
    return customer;
  }

  remove(id: number) {
    this.customersRepository.delete(id);
    return "Customer ID #" + id + " successfully deleted";
  }

  async update(id: number, updateCustomerDTO: UpdateCustomerDTO): Promise<Customers> {
    const editedCustomer = await this.findOneByID(id);
    if (editedCustomer == null) {
      throw new NotFoundException('Customer ID #' + id + ' is not found');
    } else {
      (await editedCustomer).firstName = updateCustomerDTO.firstName;
      (await editedCustomer).lastName = updateCustomerDTO.lastName;
      (await editedCustomer).email = updateCustomerDTO.email;
      this.customersRepository.save(editedCustomer);
      return editedCustomer;
    }
  }
}