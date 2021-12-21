import { Router } from 'express';
import { ServiceController } from '../controllers/serviceController';
import { authMiddleware } from '../middleware/auth-middleware';
import {
  createServiceDto,
  updateServiceDto,
} from '../dtos/service.dtos';
import { validateRequestSchema } from '../middleware/validate-request-schema';

const router = Router();

router
  .route('/')
  .get(ServiceController.getAllServices)
  .post(
    createServiceDto,
    validateRequestSchema,
    //@ts-ignore
    authMiddleware,
    ServiceController.createService
  );
router
  .route('/:id')
  .get(ServiceController.getService)
  .patch(
    updateServiceDto,
    validateRequestSchema,
    ServiceController.updateService
  )
  .delete(ServiceController.deleteService);

export { router as serviceRoutes };
