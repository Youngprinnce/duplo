import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBusinessDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ type: String, description: 'The business name.' })
  name: string;
}
