import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { BusinessService } from 'src/business/business.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
    private businessService: BusinessService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const { password, businessId } = createUserDto;
    let business = await this.businessService.getBusinessById(businessId);
    if (!business) {
      throw new NotFoundException('Business not found.');
    }
    const user = new User({ ...createUserDto, password: await hash(password, 12) });
    await this.entityManager.save(user);
    return { message: 'User created', data: user };
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const payload = { email, id: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
