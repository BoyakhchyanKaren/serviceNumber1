import { Router } from 'express';
import { googleController } from '../controllers/googleController';
const googleRoutes = Router();

googleRoutes.post("/googleLogin", googleController.googleLogin);

export default googleRoutes;