import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'original_url', type: 'varchar', length: 2048 })
  originalUrl!: string;

  @Column({ name: 'short_code', type: 'varchar', length: 8, unique: true })
  shortCode!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
