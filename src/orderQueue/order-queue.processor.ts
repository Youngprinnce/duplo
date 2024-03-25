import axios from 'axios';
import { Job, Queue } from 'bull';
import { Logger } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { TransactionService } from 'src/transactions/transaction.service';

@Processor('order')
export class OrderQueueProcessor {
  private readonly logger = new Logger(OrderQueueProcessor.name);

   constructor(
    private readonly transactionService: TransactionService,
    @InjectQueue('order') private readonly orderQueue: Queue
  ) {}

  @Process('log_txn')
  handleLogTransaction(job: Job) {
    try {
      this.logger.debug('********************* Start logging transaction *********************');
      this.transactionService.createTransaction(job.data.order);
      this.logger.debug('********************* Transaction logged *********************');
      this.orderQueue.add('send_tax', { order: job.data.order });
    } catch (error) {
      this.logger.error('Error logging transaction:', error);
    }
  }

  @Process('send_tax')
  async handleSendTax(job: Job) {
    try {
      this.logger.debug('********************* Start sending to tax authority *********************');
      await this.sendToTaxAuthority(job.data.order);
      this.logger.debug('********************* Sent to tax authority *********************');
    } catch (error) {
      this.logger.error('Error sending to tax authority:', error);
      throw error;
    }
  }

  private async sendToTaxAuthority(taxOrder: Order) {
    const taxOrderData = {
      id: taxOrder.id,
      amount: taxOrder.total,
      approved: true,
      address: "123 Main St, Springfield, IL 627017777",
    };
    const response = await axios.post('https://taxes.free.beeceptor.com/log-tax', taxOrderData, { timeout: 30 * 1000 });
    this.logger.debug('Tax authority response:', response.data);

    if (response.status !== 201) {
      throw new Error('Error sending to tax authority');
    }

    return response.data;
  }
}
