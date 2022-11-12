import { Injectable, NotFoundException, Type } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Accounts } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDTO } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) {}

  create(createAccountDTO: CreateAccountDTO) {
    return this.accountsRepository.save(createAccountDTO);
  }

  async interestCalculate(id: number) {
    const account = await this.accountsRepository.findOne({
      where: { accountID: id }
    })
    const interest = (((account.balance * 0.02) * 180)/365);
    return 'Balance: ' + account.balance + ' || This account have interest at: ' + interest.toFixed(2) + ' ฿';
  }

  findAll(): Promise<Accounts[]> {
    return this.accountsRepository.find();
  }

  remove(id: number) {
    this.accountsRepository.delete(id);
    return "Account ID #" + id + " successfully deleted";
  }

  find(id: number) {
    return this.accountsRepository.findOne({
      where: {accountID: id}
    });
  }
}