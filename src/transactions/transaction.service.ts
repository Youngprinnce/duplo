import { v4 as uuidv4 } from 'uuid';
import { Injectable } from "@nestjs/common";
import { Order } from "../orders/entities/order.entity";
import { Transaction } from "./schemas/transaction.schema";
import { TransactionRepository } from "./transaction.repository";

@Injectable()
export class TransactionService {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async createTransaction(order: Order): Promise<Transaction> {
        return this.transactionRepository.create({
            amount: order.total,
            date: new Date(),
            orderID: order.id,
            _id: uuidv4(),
            businessId: order.businessId,
            customerID: order.createdById,
        })
    }

    async getCreditScore(businessId: string)  {
        const transactions = await this.transactionRepository.find({ businessId });
        if (!transactions.length) return { creditScore: 0 };
        const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        const totalTransactions = transactions.length;

        const creditScore = totalAmount / (totalTransactions);
        return { creditScore: parseFloat(creditScore.toFixed(2)) };
    }
}
