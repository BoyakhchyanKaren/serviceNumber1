import { Router } from 'express';
import { createUserDto } from '../dtos/user.dtos';
import { validateRequestSchema } from '../middleware/validate-request-schema';

const registerRoutes = Router();
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth-middleware';


registerRoutes.post('/register',
  createUserDto,
  validateRequestSchema,
  userController.registration);


registerRoutes.post('/login',
  validateRequestSchema,
  userController.login);

registerRoutes.get('/users',
  validateRequestSchema,
  userController.getUsers);


registerRoutes.get('/getUser',
  validateRequestSchema,
  // @ts-ignore
  authMiddleware,
  userController.getUser);

registerRoutes.patch("/toggleFavorite",
  validateRequestSchema,
  //@ts-ignore
  authMiddleware,
  userController.updateFavorites);


export default registerRoutes;