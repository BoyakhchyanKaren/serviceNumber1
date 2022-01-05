import { NextFunction, Request } from 'express';
import { Response } from 'express/ts4.0';
import { OAuth2Client } from 'google-auth-library';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';
const client = new OAuth2Client(String(process.env.CLIENT_ID));

interface userI {
  given_name:string,
  family_name:string,
  email:string,
  picture:string,
};

export function checkAuthenticated(req:Request, res:Response, next:NextFunction){

  const { token } = req.body;
  let user:userI;

  async function verify(){
    const ticket = await client.verifyIdToken({
      idToken:token,
      audience:String(process.env.CLIENT_ID)
    });
    const payload = await ticket.getPayload();
    user.given_name = <string>payload?.given_name;
    user.family_name = <string>payload?.family_name;
    user.email = <string>payload?.email;
    user.picture = <string>payload?.picture;
  }
  verify()
    .then(() => {
      //@ts-ignore
      req.loggedUser = user;
      next();
    })
    .catch(err=> {
      next(HttpErr.badRequest(ExceptionMessages.INTERNAL))
    })
}