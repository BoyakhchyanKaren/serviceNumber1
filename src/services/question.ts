import {
  DeepPartial,
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { QuestionEntity } from '../entities/Question';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';
import { ServiceEntity } from '../entities/Service';
import { userEntity } from '../entities/Users';

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
  static async getAllQuestions() {
    return await getRepository(QuestionEntity).find();
  }

  static async getQuestion(questionId: string) {
    try {
      const question = await getRepository(QuestionEntity).findOne(questionId);
      return question;
    } catch {
      return null;
    }
  }

  static async createQuestion(newQuestion: DeepPartial<QuestionEntity>) {
    try {
      const service_id = await newQuestion.service_id;
      const user_id = await newQuestion.user_id;
      const user = await getRepository(userEntity).findOne(user_id);
      if(!user){
        return null;
      }
      newQuestion.userName = user.username;
      const newQuest = await getRepository(QuestionEntity).create(newQuestion);
      await getRepository(ServiceEntity).findOne(service_id);
      await getRepository(QuestionEntity).save(newQuest);
      return newQuestion;
    } catch {
      return null;
    }
  }

  static async updateQuestion(
    id: string,
    newQuestion: Partial<QuestionEntity>
  ) {
    try {
      const question = await getRepository(QuestionEntity).findOne(id);
      if (question) {
        await getRepository(QuestionEntity).merge(question, newQuestion);
        const updatedData = await getRepository(QuestionEntity).save(question);
        return updatedData;
      }
    } catch {
      return null;
    }
  }

  static async deleteQuestion(id: string) {
    try {
      const question = await getRepository(QuestionEntity).findOne(id);
      if (question) {
        const data = await getConnection()
          .createQueryBuilder()
          .update(QuestionEntity)
          .delete()
          .where({ question_id: id })
          .execute();
        return data;
      }
    } catch {
      return null;
    }
  }
}
