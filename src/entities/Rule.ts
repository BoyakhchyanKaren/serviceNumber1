import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity("Rules")
export class ruleEntity extends BaseEntity{
  @PrimaryGeneratedColumn("uuid")
  rule_id:string;

  @Column("varchar")
  rule_title:string;

  @Column("varchar")
  rule_description:string;
};
