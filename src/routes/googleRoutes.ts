import { Router } from 'express';
import { googleController } from '../controllers/googleController';
import { checkAuthenticated } from '../middleware/checkAuthenticated';
const googleRoutes = Router();

googleRoutes.post("/googleLogin", googleController.googleLogin);

googleRoutes.get('/googleDashboard', checkAuthenticated ,googleController.googleDashboard);

export default googleRoutes;