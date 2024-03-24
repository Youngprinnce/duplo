import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business) 
    private readonly businessRepository: Repository<Business>,
    private readonly entityManager: EntityManager,
  ) {}

    async createBusiness(createBusinessDto: CreateBusinessDto): Promise<Business> {
      const { name } = createBusinessDto;
      const business = new Business({ name });
      await this.entityManager.save(business);
      return business;
    }

    async getBusinessById(id: string): Promise<Business> {
      return this.businessRepository.findOne({ where: { id }})
    }
}
