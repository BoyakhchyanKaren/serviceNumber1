import {OAuth2Client} from 'google-auth-library';
import { getRepository } from 'typeorm';
import { googleEntity } from '../entities/googleUsers';
const client = new OAuth2Client(String(process.env.CLIENT_ID));
import { userInterface } from '../interfaces/user.interface';
import { tokenRepository } from './token';
export class googleRepository{

  static async verify(token:string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: String(process.env.CLIENT_ID),
    });
    const payload = ticket.getPayload();
    //@ts-ignore
    const {email} = payload;
    console.log(email, "email");
    if(!email){
      return null;
    }

    const googleUser = await getRepository(googleEntity).findOne({email});

    if(googleUser){
      const newToken = googleUser.newToken;

      return {
        token:newToken,
        userInfo:googleUser
      }

    }else if(!googleUser){
      const newUser = {
        given_name:payload?.given_name,
        family_name:payload?.family_name,
        email:payload?.email,
        picture:payload?.picture,
      };
      const newToken = await tokenRepository.generateToken(newUser);
      const user = await getRepository(googleEntity).create(newUser);
      await getRepository(googleEntity).merge(user, {
        ...user,
        newToken
      });
      const userInfo = await getRepository(googleEntity).save(user);
      return {
        token:newToken,
        userInfo
      }
    }
  }
};
