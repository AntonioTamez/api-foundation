import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { IsUrl, MaxLength, MinLength, Matches } from 'class-validator';

@Entity('urls')
@Index('idx_original_url', ['originalUrl'])
export class Url {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'original_url', type: 'varchar', length: 2048 })
  @IsUrl({}, { message: 'originalUrl must be a valid URL' })
  @MaxLength(2048, { message: 'originalUrl must not exceed 2048 characters' })
  originalUrl!: string;

  @Column({ name: 'short_code', type: 'varchar', length: 8, unique: true })
  @MinLength(6, { message: 'shortCode must be at least 6 characters' })
  @MaxLength(8, { message: 'shortCode must not exceed 8 characters' })
  @Matches(/^[a-zA-Z0-9\-_]+$/, { message: 'shortCode must be alphanumeric (hyphens/underscores allowed)' })
  shortCode!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
