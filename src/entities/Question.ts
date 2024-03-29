import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  JoinColumn,
} from 'typeorm';
import { ServiceEntity } from './Service';
import { userEntity } from './Users';

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  question_id: string;

  @Column("uuid")
  service_id:string;

  @Column("varchar", {default: null})
  user_id:string;

  @Column("varchar", {default:""})
  userName:string;

  @Column('varchar', { default: "" })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => ServiceEntity, service => service.questions, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @ManyToOne(() => userEntity, user => user.services, {
    onDelete: "CASCADE",
    eager: false,
  })
  @JoinColumn({name:"user_id"})
  user: userEntity;
}
