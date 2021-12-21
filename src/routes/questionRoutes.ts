import { Router } from 'express';
import { QuestionController } from '../controllers/questionController';
import { createQuestionDto, updateQuestionDto } from '../dtos/question.dtos';
import { authMiddleware } from '../middleware/auth-middleware';
import { validateRequestSchema } from '../middleware/validate-request-schema';


const router = Router();

router
  .route('/')
  .get(QuestionController.getAllQuestions)
  .post(
    createQuestionDto,
    validateRequestSchema,
    //@ts-ignore
    authMiddleware,
    QuestionController.createQuestion
  );
router
  .route('/:id')
  .get(QuestionController.getQuestion)
  .patch(
    updateQuestionDto,
    validateRequestSchema,
    QuestionController.updateQuestion
  )
  .delete(QuestionController.deleteQuestion);

export { router as questionRoutes };
