import { DeepPartial, getRepository } from 'typeorm';
import { userEntity } from '../entities/Users';
import password_hash from 'password-hash';
import { tokenRepository } from './token';
import removeItem from '../utils/removeItem';
import { ServiceEntity } from '../entities/Service';
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
    }
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
  }
};

