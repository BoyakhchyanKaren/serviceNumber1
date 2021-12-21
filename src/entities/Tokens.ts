import { userEntity } from './Users';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity("Tokens")
export class tokenEntity extends BaseEntity{
  @PrimaryGeneratedColumn("uuid")
  token_id:string;

  @Column("varchar")
  access_token:string;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
};
