import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { AccountsService } from './accounts.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { Accounts } from './entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Accounts[]> {
    return this.accountsService.getAllAccount();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Accounts> {
    return this.accountsService.findByID(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/interest')
  interestCalculate(@Param('id') id: number){
    return this.accountsService.interestCalculate(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAccountDTO: CreateAccountDTO): Promise<CreateAccountDTO> {
    return this.accountsService.create(createAccountDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number){
    return this.accountsService.remove(+id);
  }
}