import {
  Post,
  Body,
  HttpCode,
  Controller,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.userService.signUp(createUserDto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(loginUserDto);
  }
}
