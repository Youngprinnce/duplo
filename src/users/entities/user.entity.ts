import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  businessId: string;
}
