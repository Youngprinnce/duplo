import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { UserModule } from "./users/user.module";
import { AppController } from "./app.controller";
import { OrderModule } from "./orders/order.module";
import { BusinessModule } from "./business/business.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController]
})
export class AppModule {}
