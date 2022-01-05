import {OAuth2Client} from 'google-auth-library';
import { getRepository } from 'typeorm';
import { googleEntity } from '../entities/googleUsers';
const client = new OAuth2Client(String(process.env.CLIENT_ID));
export class googleRepository{

  static async verify(token:string){
    const ticket = await client.verifyIdToken({
      idToken:token,
      audience:String(process.env.CLIENT_ID),
    });
    const payload = ticket.getPayload();
    return payload;
  }

  static async store(info:object){
    //@ts-ignore
    const {email} = info;
    const user = await getRepository(googleEntity).findOne({email});
    if(user){
      return user;
    }
    const newUser = await getRepository(googleEntity).create(info);
    return await getRepository(googleEntity).save(newUser);
  }

};
