import express, { Request, Response, Express, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import SwaggerUI from 'swagger-ui-express';
import * as SwaggerDoc from "./swagger/openApi.json";
import { serviceRoutes } from './routes/serviceRoutes';
import { commentRoutes } from './routes/commentRoutes';
import { questionRoutes } from './routes/questionRoutes';
import { HttpErr } from './exceptions/HttpError';
import { errorHandler } from './controllers/errorHandler';

export const getApplication = (): Express => {
  const app = express()
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(morgan('dev'))
    .use(compression())
    .use('/api/v1/services', serviceRoutes)
    .use('/api/v1/comments', commentRoutes)
    .use('/api/v1/questions', questionRoutes)
    .use('/api/v1/Swagger', SwaggerUI.serve, SwaggerUI.setup(SwaggerDoc))
    .get('/', (req: Request, res: Response) => {
      res.redirect("https://pink-team-deployment.herokuapp.com/api/v1/Swagger")
    })
    .all('*', (req: Request, res: Response, next: NextFunction) => {
      next(HttpErr.notFound(`Can't find ${req.originalUrl} on this server!`));
    })
    .use(errorHandler);
  return app;
};
