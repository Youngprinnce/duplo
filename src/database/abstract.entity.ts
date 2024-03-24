import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateTimestamps() {
    this.updatedAt = new Date();
  }

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
