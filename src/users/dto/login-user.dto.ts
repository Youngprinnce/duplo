import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ type: String, example: 'hello@gmail.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({ type: String, example: 'Password1!' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak. It must contain at least one uppercase letter, one lowercase letter, one digit or special character, and be between 8 to 20 characters long.',
  })
  password: string;
}
