import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('byuser/:id')
  findByCustomerID(@Param('id') id:number) {
    return this.transactionsService.findByCustomerID(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  deposit(@Body() transaction: CreateTransactionDTO) {
    return this.transactionsService.deposit(transaction);
  }

  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  withdraw(@Body() transaction: CreateTransactionDTO) {
    return this.transactionsService.withdraw(transaction);
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  transfer(@Body() transaction: CreateTransactionDTO) {
    return this.transactionsService.transfer(transaction);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneTransaction(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }
}
