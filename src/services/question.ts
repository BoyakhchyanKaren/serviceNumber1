import {DeepPartial, EntityRepository, getConnection, getRepository, Repository} from 'typeorm';
import {QuestionEntity} from "../entities/Question";
import {CommentEntity} from "../entities/Comment";
import {CommentRepository} from "./comment";
import {ServiceRepository} from "./service";
import {ServiceEntity} from "../entities/Service";

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
  static async getAllQuestions() {
    return await getRepository(CommentEntity).find();
  }

  static async getQuestion(questionId:string) {
    const question = await getRepository(CommentEntity).findOne(questionId);
    if(question) {
      return question;
    }else{
      throw new Error("get question error");
    }
  }

  static async createQuestion(newQuestion: DeepPartial<QuestionEntity>) {
    const service_id = newQuestion.service_id;
    const service = await getRepository(ServiceEntity).findOne(service_id);
    if( !service ) {
      throw new Error("service not found");
    }
    getRepository(CommentEntity).create(newQuestion);
    return await getRepository(CommentEntity).save(newQuestion);
  }

  static async updateQuestion(id:string, newQuestion: Partial<QuestionEntity>) {
    const question = await getRepository(QuestionEntity).findOne(id);
    if(newQuestion.service_id) {
      const service = await getRepository(QuestionEntity).findOne(newQuestion.service_id);
      if(!service) {
        throw new Error("Service not found...")
      }
    }
    if(question){
      await getRepository(QuestionEntity).merge(question, newQuestion);
      await getRepository(QuestionEntity).save(question);
      return {message:"question updated"};
    }
  }

  static async deleteQuestion(id:string) {
    const question = await getRepository(QuestionEntity).findOne(id);
    if(question) {
      await getConnection()
          .createQueryBuilder()
          .update(QuestionEntity)
          .delete()
          .where({question_id:id})
          .execute()
      return {message:"question deleted..."}
    }
  }
};
