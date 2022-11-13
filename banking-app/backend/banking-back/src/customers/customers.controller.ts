import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { CustomersService } from './customers.service';
import { SignUpDTO } from './dto/signup-dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { Customers } from './entities/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.customersService.getAllCustomers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneUser(@Param('id') id: number) {
    return this.customersService.findByID(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/byemail/:email')
  findByEmail(@Param('email') email: string) {
    return this.customersService.findByEmail(email);
  }

  @Post('signup')
  signUp(@Body() signUpDTO:SignUpDTO): Promise<Customers>{
    return this.customersService.signUp(signUpDTO);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  editCustomer(@Param('id') id: number, @Body() updateCustomerDTO: UpdateCustomerDTO) {
    return this.customersService.update(+id, updateCustomerDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(+id);
  }
}