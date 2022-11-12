import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
// import { UpdateTransactionDTO } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Get('byuser/:id')
  findByCustomerID(@Param('id') id:number) {
    return this.transactionsService.findByCustomerID(id);
  }

  @Post('deposit')
  deposit(@Body() transaction: CreateTransactionDTO) {
    return this.transactionsService.deposit(transaction);
  }

  @Post('withdraw')
  withdraw(@Body() transaction: CreateTransactionDTO) {
    return this.transactionsService.withdraw(transaction);
  }

  @Post('transfer')
  transfer(@Body() transaction: CreateTransactionDTO) {
    return this.transactionsService.transfer(transaction);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionsService.findOne(+id);
  // }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionsService.remove(+id);
  // }
}
