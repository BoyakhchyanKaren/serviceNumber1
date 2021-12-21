import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, ManyToOne, JoinColumn
} from 'typeorm';
import { QuestionEntity } from './Question';
import { CommentEntity } from './Comment';
import { userEntity } from './Users';

@Entity('service')
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  service_id: string;

  @Column('varchar')
  type: string;

  @Column("varchar", {default:null})
  user_id:string;

  @Column('int', {default: 0})
  rating_quantity: number;
  
  @Column('int')
  phone_number: number;

  @Column("float",{ array: true, default: [], nullable: false })
  coordinates: number[];

  @Column('varchar',)
  description: string;

  @Column('varchar')
  address: string;

  @Column('varchar', {nullable: false })
  summary: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => QuestionEntity, question => question.service, {
    cascade: true,
    eager: true,
  })
  questions: QuestionEntity[];

  @OneToMany(() => CommentEntity, comment => comment.service, {
    cascade: true,
    eager: true,
  })
  comments: CommentEntity[];

  @ManyToOne( () => userEntity, user => user.services, {
    onDelete:"CASCADE",
    eager:false,
  })
  @JoinColumn({name:"user_id"})
  user: userEntity;
}
