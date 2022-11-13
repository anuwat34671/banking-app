import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { AccountsService } from './accounts.service';
import { CreateAccountDTO } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAccountDTO: CreateAccountDTO) {
    return this.accountsService.create(createAccountDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.accountsService.find(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/interest')
  interestCalculate(@Param('id') id: number) {
    return this.accountsService.interestCalculate(+id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountsService.remove(+id);
  }
}