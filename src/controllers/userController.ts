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
      console.log("1");
      if(!userData){
        return next(HttpErr.notFound(ExceptionMessages.DB_ERROR));
      };
      console.log("2");
      res.status(StatusCode.CreateRequest).json(userData);
    }catch (e){
      console.log(e);
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
  };

  static async getUsers (req:Request, res:Response, next:NextFunction) {
    try{
      const usersData = await userRepository.getUsers();
      if(!usersData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.USERS))
      }
      res.status(StatusCode.SuccessRequest).json(usersData);
    }catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async getUser (req:Request, res:Response, next:NextFunction) {
    try{
      //@ts-ignore
      const user = await req.userData;
      const getUser = await userRepository.getUser(user);
      if(!getUser) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.USER));
      };
      res.status(StatusCode.SuccessRequest).json(getUser);
    }catch (e){
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }
}

