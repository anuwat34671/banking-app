import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './customers/entities/customer.entity';
import { Accounts } from './accounts/entities/account.entity';
import { Transactions } from './transactions/entities/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { CustomersModule } from './customers/customers.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Oven.34671',
      database: 'bankingdb',
      entities: [Customers,Accounts,Transactions],
      synchronize: false,
      autoLoadEntities: true
    }),
    TransactionsModule,
    CustomersModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}