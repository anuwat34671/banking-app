import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Accounts } from 'src/accounts/entities/account.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) {}
  
  async deposit(createTransactionDTO: CreateTransactionDTO) {
    try {
      const accounts = await this.accountsRepository.findOne({
        where: {accountID:createTransactionDTO.mainAccount}
      });
          accounts.balance = createTransactionDTO.amount + accounts.balance;
          this.accountsRepository.save(accounts);
          this.transactionsRepository.save(createTransactionDTO);
          return accounts;
    } catch (e) {
      throw new BadRequestException('Failed to deposit. Account not exist.');
    }
  }

  async withdraw(createTransactionDTO: CreateTransactionDTO) {
    const accounts = await this.accountsRepository.findOne({
      where: {accountID:createTransactionDTO.mainAccount}
    });
    if(accounts){
    if(accounts.balance < createTransactionDTO.amount){
        throw new BadRequestException('cannot withdraw, not enough balance || ' + 'remaining balance: ' + accounts.balance + 
        ' || withdraw amount: ' + createTransactionDTO.amount)
    }
    accounts.balance = accounts.balance - createTransactionDTO.amount;
    this.accountsRepository.save(accounts);
    this.transactionsRepository.save(createTransactionDTO);
    return accounts;
  } else {
    throw new BadRequestException('Cannot withdraw. Account not exist.');
  }
}

  async transfer(createTransactionDTO: CreateTransactionDTO) {
      if(createTransactionDTO.mainAccount != createTransactionDTO.otherAccount){
        const mainAccount = await this.accountsRepository.findOne({
          where: {accountID:createTransactionDTO.mainAccount}
        });
        const otherAccount = await this.accountsRepository.findOne({
          where: {accountID:createTransactionDTO.otherAccount}
        });
        if(mainAccount && otherAccount){
        if(mainAccount.balance < createTransactionDTO.amount){
          throw new BadRequestException('cannot transfer, not enough balance || ' + 'main Account balance: ' + mainAccount.balance + 
          ' || withdraw amount: ' + createTransactionDTO.amount)
        }
        
        mainAccount.balance = mainAccount.balance - createTransactionDTO.amount;
        otherAccount.balance = otherAccount.balance + createTransactionDTO.amount;
        
        this.accountsRepository.save(mainAccount);
        this.accountsRepository.save(otherAccount);

        
        this.transactionsRepository.save(createTransactionDTO);
        return mainAccount;
      } else {
        throw new BadRequestException('Cannot transfer. there are only one accounts exist');
      }
    } throw new BadRequestException('Cannot transfer to same account.');
  }

  findAll(): Promise<Transactions[]> {
    return this.transactionsRepository.find();
  }

  findByID(id: number) {
    return this.transactionsRepository.findOne({ where: {transactionID: id}});
  }

  async findByAccountID(id: number): Promise<Transactions[]> {
    return await this.transactionsRepository.find({ 
      where: [{mainAccount:id},{otherAccount:id}],
    });
  }
}