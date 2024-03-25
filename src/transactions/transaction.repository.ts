import { Injectable } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Transaction, TransactionDocument } from "./schemas/transaction.schema";

@Injectable()
export class TransactionRepository {
    constructor(@InjectModel(Transaction.name) 
    private transactionModel: Model<TransactionDocument>) {}

    async create(transaction: Transaction): Promise<Transaction> {
        const newTransaction = new this.transactionModel(transaction);
        return newTransaction.save()
    }

    async find(transactionFilterQuery: FilterQuery<Transaction>): Promise<Transaction[]> {
        return this.transactionModel.find(transactionFilterQuery)
    }

    async findOne(transactionFilterQuery: FilterQuery<Transaction>): Promise<Transaction> {
        return this.transactionModel.findOne(transactionFilterQuery)
    } 
}
