import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionService } from "./transaction.service";
import { TransactionRepository } from "./transaction.repository";
import { Transaction, TransactionSchema } from "./schemas/transaction.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
    providers: [TransactionService, TransactionRepository],
    exports: [TransactionService],
})
export class TransactionModule {}

