import {
  Body,
  Post,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { Business } from './entities/business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private busnessService: BusinessService) {}

  @Post()
  createBusiness(
    @Body(ValidationPipe) createBusinessDto: CreateBusinessDto,
  ): Promise<Business> {
    return this.busnessService.createBusiness(createBusinessDto);
  }
}
