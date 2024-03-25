import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { UserModule } from "src/users/user.module";
import { OrderController } from "./order.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModule,
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
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
