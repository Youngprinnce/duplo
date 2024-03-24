import { Entity, Column } from 'typeorm';
import { IsString } from 'class-validator';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class Business extends AbstractEntity<Business> {
    @Column()
    @IsString()
    name: string;
}
