import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getRepository } from 'typeorm';
import { tokenEntity } from '../entities/Tokens';
dotenv.config();
export class tokenRepository {

  static async generateToken (payload:any) {
    return jwt.sign(payload, String(process.env.ACCESS_SECRET_KEY), {expiresIn:"30d"});
  };

  static async validateAccessToken (token:string) {
    try{
      return jwt.verify(token, String(process.env.ACCESS_SECRET_KEY));
    }catch (e){
      return null;
    }
  };

  static async saveToken(userID: string | undefined, accessToken: string) {
    const tokenData = await getRepository(tokenEntity).findOne({token_id:userID});
    if(tokenData){
      tokenData.access_token = accessToken;
      return await getRepository(tokenEntity).save(tokenData);
    };
    const token = await getRepository(tokenEntity).create({token_id:userID, access_token:accessToken});
    await getRepository(tokenEntity).save(token);
    return token;
  };

  static async removeToken (accessToken:string) {
    const token = await getRepository(tokenEntity).findOne({access_token:accessToken});
    if(token){
      await getRepository(tokenEntity).delete(token);
    }
    return token;
  };

  static async findToken ( accessToken:string ) {
    return await getRepository(tokenEntity).findOne({access_token:accessToken});
  };
};