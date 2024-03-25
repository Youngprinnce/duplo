import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { UserModule } from "./users/user.module";
import { DatabaseModule } from "./database/database.module";
import { BusinessModule } from "./business/business.module";
import { TransactionModule } from "./transactions/transaction.module";
import { OrderModule } from "./orders/order.module";
import { OrderQueueModule } from "./orderQueue/order-queue.module";
import { BullModule } from "@nestjs/bull";
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
        host: "redis",
        port: 6379,
      },
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
