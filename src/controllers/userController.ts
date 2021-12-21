import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../services/user';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

export class userController {

  static async registration (req:Request, res:Response, next:NextFunction ) {
    try{
      const newUser = await req.body;
      const userData = await userRepository.registration(newUser);
      if(!userData){
        return next(HttpErr.notFound(ExceptionMessages.DB_ERROR));
      };
      res.status(StatusCode.CreateRequest).json(userData);
    }catch (e){
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async login (req:Request, res:Response, next:NextFunction) {
    try{
      const data = await req.body;
      const loginData = await userRepository.login(data);
      if(!loginData){
        return next(HttpErr.notFound(ExceptionMessages.DB_ERROR));
      }
      res.status(StatusCode.CreateRequest).json(loginData);
    }catch (e){
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }
}

