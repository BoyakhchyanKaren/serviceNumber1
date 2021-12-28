import { getRepository } from 'typeorm';
import { ruleEntity } from '../entities/Rule';

export class ruleRepository {
  static async getRules(){
    return await getRepository(ruleEntity).find();
  };

  static async getRuleById(id:string){
    const rule = await getRepository(ruleEntity).findOne(id);
    if(!rule){
      return null;
    }
    return rule;
  }
};
