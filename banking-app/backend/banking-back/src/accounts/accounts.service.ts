import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Accounts } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UpdateAccountDTO } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) {}

  create(createAccountDTO: CreateAccountDTO) {
    return this.accountsRepository.save(createAccountDTO);
  }

  findAll(): Promise<Accounts[]> {
    return this.accountsRepository.find();
  }

  remove(id: number) {
    this.accountsRepository.delete(id);
    return "Account ID #" + id + " successfully deleted";
  }

  findOne(id: number) {
    return this.accountsRepository.findOne({
      select: ['accountID','customerID','balance'],
      where: {accountID: id}
    });
  }

  update(id: number, updateAccountDTO: UpdateAccountDTO) {
    return `This action updates a #${id} account`;
  }

  // async editNote(id: number, updateAccountDTO: UpdateAccountDTO): Promise<Accounts> {
  //   const editedAccount = await this.accountsRepository.update(id, updateAccountDTO);
  //   if (!editedAccount) {
  //     throw new NotFoundException('Account is not found');
  //   }
  //   editedAccount.balance: = this.balance;
  //   editedAccount.customerID = this.customerID;
  //   await editedNote.save();
  //   return editedNote;
  // }

}
