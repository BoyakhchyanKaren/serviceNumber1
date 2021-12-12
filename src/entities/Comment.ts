import {
  BaseEntity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { ServiceEntity } from './Service';

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column('varchar', {default: ""})
  content: string;

  @Column()
  service_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => ServiceEntity, service => service.comments, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;
}
