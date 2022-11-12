import { Module } from '@nestjs/common';
import { Accounts } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService]
})

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [TypeOrmModule]
})
export class AccountsModule {}
