import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBusinessDto {
  @IsString()
  @ApiProperty({ type: String, description: 'The business name.' })
  name: string;
}
