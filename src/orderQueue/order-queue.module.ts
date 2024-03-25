import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { OrderQueueProcessor } from "./order-queue.processor";
import { TransactionModule } from "src/transactions/transaction.module";

@Module({
  imports: [
    TransactionModule,
    BullModule.registerQueue({
      name: "order",
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      },
    }),
  ],
  providers: [OrderQueueProcessor],
})
export class OrderQueueModule {}
