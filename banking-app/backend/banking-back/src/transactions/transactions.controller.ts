import { Controller, Get, Post, Body, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneTransaction(@Param('id') id: string) {
    return this.transactionsService.findByID(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('byaccount/:id')
  findByCustomerID(@Param('id') id:number) {
    return this.transactionsService.findByAccountID(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  action(@Body() transaction: CreateTransactionDTO){
    if(transaction.type == "deposit"){
      return this.transactionsService.deposit(transaction);
    }
    if(transaction.type == "withdraw"){
      return this.transactionsService.withdraw(transaction);
    }
    if(transaction.type == "transfer"){
      return this.transactionsService.transfer(transaction);
    } else {
      throw new BadRequestException("Action not match with any type. Please try again.");
    }
  }
}
