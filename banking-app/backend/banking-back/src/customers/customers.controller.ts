import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Controller('/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomer: CreateCustomerDTO) {
    return this.customersService.create(createCustomer);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customersService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCustomerDTO: UpdateCustomerDTO) {
    return this.customersService.update(+id, updateCustomerDTO);
  }
}
