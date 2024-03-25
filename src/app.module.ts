import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { UserModule } from "./users/user.module";
import { DatabaseModule } from "./database/database.module";
import { BusinessModule } from "./business/business.module";
import { TransactionModule } from "./transactions/transaction.module";
import { OrderModule } from "./orders/order.module";
@Module({
  imports: [
    UserModule,
    OrderModule,
    DatabaseModule,
    BusinessModule,
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController]
})
export class AppModule {}
