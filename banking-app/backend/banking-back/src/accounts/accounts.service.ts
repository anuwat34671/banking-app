import { BadRequestException, Injectable, NotFoundException, Type } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Accounts } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDTO } from './dto/create-account.dto';
import { Customers } from 'src/customers/entities/customer.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) {}

  async create(createAccountDTO: CreateAccountDTO) {
    try {
      await this.accountsRepository.save(createAccountDTO);
      return createAccountDTO;
    } catch (e) {
      throw new BadRequestException("Cannot create account : " + e.message);
    }
  }

  async interestCalculate(id: number) {
    const account = await this.accountsRepository.findOne({
      where: { accountID: id }
    })
    const interest = (((account.balance * 0.02) * 180)/365);
    return 'Balance: ' + account.balance + ' || This account have interest at: ' + interest.toFixed(2) + ' ฿';
  }

  async getAllAccount(): Promise<Accounts[]> {
    const account = await this.accountsRepository.find();
    return account;
  }

  remove(id: number) {
    this.accountsRepository.delete(id);
    return "Account ID #" + id + " successfully deleted";
  }

  findByID(id: number): Promise<Accounts> {
    return this.accountsRepository.findOne({
      where: {accountID: id}
    });
  }
}