import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customers } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>,
  ) {}

  create(createCustomer: CreateCustomerDTO) {
    return this.customersRepository.save(createCustomer);
  }

  findAll(): Promise<Customers[]> {
    return this.customersRepository.find();
  }

  findOne(id: number) {
    return this.customersRepository.findOne({
      select: ['customerID','firstName','lastName','email'],
      where: {customerID: id}
    });
  }

  remove(id: number) {
    this.customersRepository.delete(id);
    return "Customer ID #" + id + " successfully deleted";
  }

  async update(id: number, updateCustomerDTO: UpdateCustomerDTO): Promise<Customers> {
    const editedCustomer = await this.findOne(id);
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