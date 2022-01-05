import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity("googleUsers")
export class googleEntity extends BaseEntity{
  @PrimaryGeneratedColumn("uuid")
  auth_id:string;

  @Column("varchar")
  given_name:string;

  @Column("varchar")
  family_name:string;

  @Column("varchar")
  email:string;

  @Column("varchar")
  picture:string;

  @Column("varchar")
  newToken:string;
};