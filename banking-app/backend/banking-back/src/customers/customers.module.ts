import { Module } from '@nestjs/common';
import { Customers } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [TypeOrmModule]
})

export class CustomersModule {}