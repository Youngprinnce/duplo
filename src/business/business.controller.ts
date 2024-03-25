import {
  Body,
  Post,
  Controller,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { Business } from './entities/business.entity';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { CreateBusinessDto } from './dto/create-business.dto';
import { TransactionService } from 'src/transactions/transaction.service';

@Controller('business')
export class BusinessController {
  constructor(
    private busnessService: BusinessService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  createBusiness(
    @Body(ValidationPipe) createBusinessDto: CreateBusinessDto,
  ): Promise<Business> {
    return this.busnessService.createBusiness(createBusinessDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get("/get-credit-score")
  async getCreditScore(@GetUser() user: User): Promise<{creditScore: number}> {
    return await this.transactionService.getCreditScore(user.businessId);
  }
}
