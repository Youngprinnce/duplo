import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { IsNumber, IsPositive, IsString } from 'class-validator';
@Entity()
export class Order extends AbstractEntity<Order> {
    @Column({ type: 'uuid'})
    @IsString()
    businessId: string;

    @Column()
    @IsNumber()
    productId: number;

    @Column()
    @IsPositive()
    quantity: number;

    @Column({ type: 'decimal', scale: 2 })   
    @IsPositive()
    price: number;

    @Column({ type: 'decimal', scale: 2})
    @IsPositive()
    total: number;

    @Column()
    @IsString()
    createdById: string;
}
