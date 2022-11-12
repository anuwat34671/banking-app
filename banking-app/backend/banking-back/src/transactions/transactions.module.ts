import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transactions } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions]),AccountsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TypeOrmModule]
})
export class TransactionsModule {}
