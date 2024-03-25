import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) 
    private readonly orderRepository: Repository<Order>,
    private readonly entityManager: EntityManager,
    @InjectQueue('order') private readonly orderQueue: Queue
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    const newOrder = new Order({
      ...createOrderDto,
      total: createOrderDto.quantity * createOrderDto.price,
      businessId: user.businessId,
      createdById: user.id,
    });

    await this.entityManager.save(newOrder);
    this.orderQueue.add('log_txn', { order: newOrder });

    return newOrder;
  }

  async getOrderDetails(businessId: string): Promise<any> {
    let orders: Order[] = [];
    try {
      orders = await this.orderRepository.find({ where: { businessId } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    const totalOrders = orders.length;
    const totalAmount: number = orders.reduce((acc: number, order: Order) => acc + Number(order.total), 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders: Order[] = orders.filter((order: Order) => order.createdAt >= today);
    const todayTotalOrders = todayOrders.length;
    const todayTotalAmount: number = todayOrders.reduce((acc: number, order: Order) => acc + Number(order.total), 0);

    return {
      totalOrders,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      todayTotalOrders,
      todayTotalAmount: parseFloat(todayTotalAmount.toFixed(2)),
    };
  }
}
