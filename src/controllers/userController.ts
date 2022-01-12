import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../services/user';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';
import password_hash from 'password-hash';
import { getRepository } from 'typeorm';
import { userEntity } from '../entities/Users';
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
      const {password, email} = req.body;
      const user  = await getRepository(userEntity).findOne({email});
      if(!user){
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.USER));
      };
      const passedPassword = password_hash.verify(password, user?.password);
      if(!passedPassword){
        return next(HttpErr.notFound(ExceptionMessages.INVALID.PASSWORD));
      }
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
  };

  static async updateFavorites(req:Request, res:Response, next:NextFunction){
    try{
      //@ts-ignore
      const user = await req.userData;
      const { service_id } = await req.body;
      const userInfo = await userRepository.updateFavorites(user, service_id);
      if(!userInfo){
        return next(HttpErr.notFound(ExceptionMessages.INVALID.USER))
      };
      res.status(StatusCode.SuccessRequest).json(userInfo);
    }catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async googleLogin(req:Request, res:Response, next:NextFunction) {
    try{
      const {token} = await req.body;
      console.log(token);
      const loginData = await userRepository.tokenGenerateProcess(token);
      if(!loginData){
        next(HttpErr.notFound(ExceptionMessages.INVALID.USER));
      };
      console.log(loginData);
      res.status(StatusCode.SuccessRequest).json(loginData);
    }catch (e){
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async changePassword(req:Request, res:Response,next:NextFunction){
    try {
      const { new_password } = await req.body;
      //@ts-ignore
      const { email } = req.userData;
      const updatedData = await userRepository.updatePassword(email, new_password);
      if(!updatedData){
        next(HttpErr.notFound(ExceptionMessages.INVALID.USER));
      };
      res.status(StatusCode.SuccessRequest).json(updatedData);
    }
    catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

}

