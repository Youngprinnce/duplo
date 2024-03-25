import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TransactionService } from 'src/transactions/transaction.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly transactionService: TransactionService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth('access-token')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
    ): Promise<Order> {
    return await this.orderService.createOrder(createOrderDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('/get-order-details')
  async getOrderDetails(@GetUser() user: User): Promise<any> {
    return await this.orderService.getOrderDetails(user.businessId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get("/get-credit-score")
  async getCreditScore(@GetUser() user: User): Promise<{creditScore: number}> {
    return await this.transactionService.getCreditScore(user.businessId);
  }
}
