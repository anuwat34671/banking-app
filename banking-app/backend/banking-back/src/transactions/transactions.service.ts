import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Accounts } from 'src/accounts/entities/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) {}
  
  async deposit(createTransactionDTO: CreateTransactionDTO) {
    const accounts = await this.accountsRepository.findOne({
      where: {accountID:createTransactionDTO.mainAccount}
    });
    accounts.balance = createTransactionDTO.amount + accounts.balance;
    this.accountsRepository.save(accounts);
    this.transactionsRepository.save(createTransactionDTO);
    return accounts;
  }

  async withdraw(createTransactionDTO: CreateTransactionDTO) {
    const accounts = await this.accountsRepository.findOne({
      where: {accountID:createTransactionDTO.mainAccount}
    });
    if(accounts.balance < createTransactionDTO.amount){
      throw new BadRequestException('cannot withdraw, not enough balance ' + 'remaining balance: ' + accounts.balance + 
      ' withdraw amount: ' + createTransactionDTO.amount)
    }
    accounts.balance = accounts.balance - createTransactionDTO.amount;
    this.accountsRepository.save(accounts);
    this.transactionsRepository.save(createTransactionDTO);
    return accounts;
  }

  async transfer(createTransactionDTO: CreateTransactionDTO) {
    const mainAccount = await this.accountsRepository.findOne({
      where: {accountID:createTransactionDTO.mainAccount}
    });
    const otherAccount = await this.accountsRepository.findOne({
      where: {accountID:createTransactionDTO.otherAccount}
    });
    if(mainAccount.balance < createTransactionDTO.amount){
      throw new BadRequestException('cannot withdraw, not enough balance ' + 'main Account balance: ' + mainAccount.balance + 
      ' withdraw amount: ' + createTransactionDTO.amount)
    }
    if(otherAccount.balance < createTransactionDTO.amount){
      throw new BadRequestException('cannot withdraw, not enough balance ' + 'other Account balance: ' + otherAccount.balance + 
      ' withdraw amount: ' + createTransactionDTO.amount)
    }
    if(createTransactionDTO.type == "transfer_received"){
      mainAccount.balance = mainAccount.balance + createTransactionDTO.amount;
      otherAccount.balance = otherAccount.balance - createTransactionDTO.amount;
    }
    if(createTransactionDTO.type == "transfer_sended"){
      mainAccount.balance = mainAccount.balance - createTransactionDTO.amount;
      otherAccount.balance = otherAccount.balance + createTransactionDTO.amount;
    }

    this.accountsRepository.save(mainAccount);
    this.accountsRepository.save(otherAccount);

    this.transactionsRepository.save(createTransactionDTO);
    return mainAccount;
  }

  findAll(): Promise<Transactions[]> {
    return this.transactionsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
