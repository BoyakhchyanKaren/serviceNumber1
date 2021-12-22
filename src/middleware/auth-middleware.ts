import { tokenRepository } from '../services/token';
import { NextFunction } from 'express';
import { HttpErr } from '../exceptions/HttpError';

export async function authMiddleware(req:Request, res:Response, next:NextFunction){
  try{
    //@ts-ignore
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);
    if(!authorizationHeader) {
      return next(HttpErr.UnauthorizedError("User doesn't authorized..."));
    };
    const accessToken  = authorizationHeader.split(" ")[1];
    if(!accessToken) {
      return next(HttpErr.UnauthorizedError("User doesn't authorized..."));
    };
    const userData = await tokenRepository.validateAccessToken(accessToken);
    if(!userData) {
      return next(HttpErr.UnauthorizedError("User doesn't authorized..."));
    }
    //@ts-ignore
    req.userData = userData;
    next();
  }catch (e){
    return next(HttpErr.UnauthorizedError("User doesn't authorized..."))
  }
};