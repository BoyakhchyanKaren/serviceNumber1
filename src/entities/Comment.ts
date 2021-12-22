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
import { userEntity } from './Users';

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column('varchar', {default: ""})
  content: string;

  @Column()
  service_id: string;

  @Column("varchar", {default:null})
  user_id: string;

  @Column("varchar", {default:""})
  userName:string;

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

  @ManyToOne(() => userEntity, user => user.comments, {
    onDelete: "CASCADE",
    eager: false,
  })
  @JoinColumn({name:'user_id'})
  user: userEntity;
}
