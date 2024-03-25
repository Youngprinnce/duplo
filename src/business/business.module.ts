import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessService } from './business.service';
import { Business } from './entities/business.entity';
import { BusinessController } from './business.controller';
import { TransactionModule } from 'src/transactions/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Business]), 
    TransactionModule
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [BusinessService],
})
export class BusinessModule {}

