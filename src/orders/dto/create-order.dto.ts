import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'The product ID.' })
  productId: number;

  @IsPositive()
  @ApiProperty({ type: Number, description: 'The quantity of the product.' })
  quantity: number;

  @IsPositive()
  @ApiProperty({ type: Number, description: 'The price of the product.' })
  price: number;
}
