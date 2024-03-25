import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./users/user.module";
import { AppController } from "./app.controller";
import { OrderModule } from "./orders/order.module";
import { BusinessModule } from "./business/business.module";
import { DatabaseModule } from "./database/database.module";
import { OrderQueueModule } from "./orderQueue/order-queue.module";
import { TransactionModule } from "./transactions/transaction.module";
@Module({
  imports: [
    UserModule,
    OrderModule,
    DatabaseModule,
    BusinessModule,
    OrderQueueModule,
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
