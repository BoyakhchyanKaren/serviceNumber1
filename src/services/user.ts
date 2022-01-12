import { DeepPartial, getRepository } from 'typeorm';
import { userEntity } from '../entities/Users';
import password_hash from 'password-hash';
import { tokenRepository } from './token';
import removeItem from '../utils/removeItem';
import { ServiceEntity } from '../entities/Service';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
const client = new OAuth2Client(String(process.env.CLIENT_ID));
import {v4} from 'uuid';
import { tokenEntity } from '../entities/Tokens';
// import mailService from './mailService';
export class userRepository {

  static async registration(newUser: DeepPartial<userEntity>) {
    const email = await newUser.email;
    const password = await newUser.password;
    const user = await getRepository(userEntity).findOne({ email });
    if (user) {
      throw new Error('User with email is already exist...');
    }
    ;
    if (!password) {
      throw new Error('Please provide password');
    };

    const hashPassword = password_hash.generate(password);
    const candidate = await getRepository(userEntity).create({
      ...newUser,
      password: hashPassword
    });
    // @ts-ignore
    // const fullName = `${newUser.firstname} ${newUser.lastname}`;
    // await mailService.sendEmail(email, `${process.env.API_URL}`, fullName);
    await getRepository(userEntity).save(candidate);
    return candidate;
  };

  static async login(loginData: DeepPartial<userEntity>) {
    const {email, password} = loginData;
    const user = await getRepository(userEntity).findOne({email});
    if(!user){
      throw new Error(`User with email ${email} doesn't exist...`);
    };
    if (password != null) {
      const passedPassword = password_hash.verify(password, user.password);
      if(!passedPassword) {
        throw new Error("wrong password");
      }
    };
    const token = await tokenRepository.generateToken({...loginData});
    await tokenRepository.saveToken(loginData.user_id, token);
    const userInfo = await removeItem(user);
    return {
      ...userInfo,
      token
    };
  };

  static async getUsers ( ) {
    return await getRepository(userEntity).find();
  };


  static async getUser ( user:object ) {
    //@ts-ignore
    const {email} = await user;
    if(!email) {
      return null;
    };
    const findUser = await getRepository(userEntity).findOne({email});
    if(!findUser) {
      throw new Error(`User with email : ${email} doesn't exist`);
    };
    return findUser;
  };

  static async updateFavorites (userInfo:Partial<userEntity>, serviceId:string){
    const {email} = await userInfo;
    if(!email){
      return null
    };
    const user = await getRepository(userEntity).findOne({email});
    if(!user){
      return null;
    };
    const service = await getRepository(ServiceEntity).findOne(serviceId);
    if(!service){
      return null;
    };
    //@ts-ignore
    const findService = await user.favorites.find(el => el.service_id === serviceId);
    if(!findService){
      const newUser = {
        ...user,
        favorites:[...user.favorites, {
          service_id:service.service_id,
          type:service.type,
          address:service.address,
          summary:service.summary,
          description:service.description,
        }]
      }
      await getRepository(userEntity).merge(user, newUser);
      await getRepository(userEntity).save(user);
      return user;
    }else if(findService){
      //@ts-ignore
      const  favorites = user.favorites.filter(el => el.service_id !== serviceId);
      console.log(favorites);
      const newUser = {
        ...user,
        favorites: [...favorites]
      };
      await getRepository(userEntity).merge(user, newUser);
      await getRepository(userEntity).save(user);
      return user;
    }
  };

  static async tokenGenerateProcess(accessToken:string) {
    const ticket = await client.verifyIdToken({
      idToken:accessToken,
      audience:String(process.env.CLIENT_ID),
    });
    const payload:TokenPayload = <TokenPayload>ticket.getPayload();
    //@ts-ignore
    const {email} = payload;
    const user = await getRepository(userEntity).findOne({email});
    if(user){
      const {firstname, lastname} = user;
      const newUser = {
        firstname,
        lastname,
        email
      };

      const newToken = await tokenRepository.generateToken(newUser);
      //
      let bool = false;
      if(user.password !== "sha1$e9094648$1$ff4c1b0c3413896859d74363918fba8145cb99c0"){
        bool = true;
      };
      //
      const result = await removeItem(user);
      return {
        ...result,
        token:newToken,
        isActivated:bool,
      };
    }else if(!user){
      const {given_name:firstname, family_name:lastname, email} = payload;
      const newUser  = {
        firstname,
        lastname,
        email,
        password: "sha1$e9094648$1$ff4c1b0c3413896859d74363918fba8145cb99c0",
      };
      const newToken = await tokenRepository.generateToken({...newUser});
      const googleUser = await getRepository(userEntity).create(newUser);
      const generatedToken = await tokenRepository.saveToken(googleUser.user_id, newToken);
      await getRepository(userEntity).save(googleUser);
      const findGoogleUser:any = await getRepository(userEntity).findOne({email});
      const resultUser = await removeItem(findGoogleUser);
      return {
        ...resultUser,
        token:generatedToken?.access_token
      };
    }
  };

  static async updatePassword(email:string, newPassword:string){
    const user = await getRepository(userEntity).findOne({email});
    if(!user){
      return null;
    }
    const hashedPass = password_hash.generate(newPassword);
    await getRepository(userEntity).merge(user, {password:hashedPass});
    const newUser =  await getRepository(userEntity).save(user);
    return await removeItem(newUser);
  };

};


