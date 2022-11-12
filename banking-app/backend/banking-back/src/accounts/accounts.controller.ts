import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDTO } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDTO: CreateAccountDTO) {
    return this.accountsService.create(createAccountDTO);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.accountsService.find(+id);
  }

  @Get(':id/interest')
  interestCalculate(@Param('id') id: number) {
    return this.accountsService.interestCalculate(+id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountsService.remove(+id);
  }
}