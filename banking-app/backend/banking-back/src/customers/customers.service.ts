import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customers } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDTO } from './dto/create-customer.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>,
  ) {}

  //async?
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

  // update(id: number, updateCustomerDto: UpdateCustomerDto) {
  //   return `This action updates a #${id} customer`;
  // }
}
