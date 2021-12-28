import { Router } from 'express';
import { ruleController } from '../controllers/ruleController';


const ruleRoutes = Router();

ruleRoutes.route("/").get(ruleController.getRules);

ruleRoutes.route("/:id").get(ruleController.getRuleById);

export default ruleRoutes;