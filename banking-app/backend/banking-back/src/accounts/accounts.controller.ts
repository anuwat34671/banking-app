import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Accounts } from './entities/account.entity';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UpdateAccountDTO } from './dto/update-account.dto';

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
    return this.accountsService.findOne(+id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountsService.remove(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAccountDTO: UpdateAccountDTO) {
    return this.accountsService.update(+id, updateAccountDTO);
  }

  // @Patch(':id')
  // async editNote(@Body() account: Accounts, @Param('id') id: number): Promise<Accounts> {
  //   const editedAccount = await this.accountsService.editNote(id, note);
  //   return noteEdited;
  // }

}