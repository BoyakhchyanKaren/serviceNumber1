import { googleRepository } from '../services/google';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';
import { NextFunction, Request, Response } from 'express';

export class googleController {

  static async googleLogin(req:Request, res:Response, next:NextFunction) {
    try{
      const {token} = await req.body;
      const loginData = await googleRepository.verify(token);
      if(!loginData){
        next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.USER));
      };
      res.status(StatusCode.SuccessRequest).json({
        data:loginData,
        message:"success",
      });
    }catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL))
    }
  };
};
