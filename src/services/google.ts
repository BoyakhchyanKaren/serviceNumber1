import {OAuth2Client} from 'google-auth-library';
import { getRepository } from 'typeorm';
import { googleEntity } from '../entities/googleUsers';
const client = new OAuth2Client(String(process.env.CLIENT_ID));
import { userInterface } from '../interfaces/user.interface';
export class googleRepository{

  static async verify(token:string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: String(process.env.CLIENT_ID),
    });
    const payload = ticket.getPayload();
    //@ts-ignore
    const {email} = payload;
    if(!email){
      return null;
    }
    const googleUser = await getRepository(googleEntity).findOne({email});
    if(!googleUser){
      const newUser:userInterface = {
        given_name:payload?.given_name,
        family_name:payload?.family_name,
        email:payload?.email,
        picture:payload?.picture,
      };
      const user = await getRepository(googleEntity).create(newUser);
      await getRepository(googleEntity).save(user);
    };
    return payload;
  }
};
