import { DeepPartial, getRepository } from 'typeorm';
import { userEntity } from '../entities/Users';
import password_hash from 'password-hash';
import { tokenRepository } from './token';

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
    }
    ;
    const hashPassword = password_hash.generate(password);
    const candidate = await getRepository(userEntity).create({
      ...newUser,
      password: hashPassword
    });
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
    console.log(user);
    return {
      ...user,
      token
    }
  }
};
