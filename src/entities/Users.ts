import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn, OneToMany
} from 'typeorm';
import { tokenEntity } from './Tokens';
import { CommentEntity } from './Comment';
import { QuestionEntity } from './Question';
import { ServiceEntity } from './Service';
@Entity("Users")
export class userEntity extends BaseEntity{
  @PrimaryGeneratedColumn("uuid")
  user_id:string;

  @Column("varchar", {unique:true})
  email:string;

  @Column("varchar")
  password:string;

  @Column("varchar")
  firstname:string;

  @Column("varchar")
  lastname:string;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

  @OneToMany(() => ServiceEntity, service => service.user,{
    cascade:true,
    eager:true
  })
  services:ServiceEntity[];

  @OneToMany(() => CommentEntity, comment => comment.user, {
    cascade:true,
    eager:true,
  })
  comments: CommentEntity[];

  @OneToMany(() => QuestionEntity, question => question.user, {
    cascade:true,
    eager:true
  })
  questions: QuestionEntity[];
}