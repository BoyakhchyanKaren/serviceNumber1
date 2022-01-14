import {
  DeepPartial,
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { ServiceEntity } from '../entities/Service';
import { IService } from '../interfaces';
import { userEntity } from '../entities/Users';
import { static } from 'express';

@EntityRepository(ServiceEntity)
export class ServiceRepository extends Repository<ServiceEntity> {
  static async getAllServices() {
    return await getRepository(ServiceEntity).find();
  }

  static async getService(serviceId: string) {
    try {
      return await getRepository(ServiceEntity).findOne(serviceId);
    } catch {
      return null;
    }
  }

  static async createService(newService: DeepPartial<ServiceEntity>) {
    const user_id = await newService.user_id;
    console.log(user_id);
    const user = await getRepository(userEntity).findOne(user_id);
    console.log(user);
    const newEcoService = await getRepository(ServiceEntity).create(newService);
    await getRepository(ServiceEntity).save(newEcoService);
    return newEcoService;
  }

  static async updateService(id: string, newService: IService) {
    console.log(newService);
    try {
      const service = await getRepository(ServiceEntity).findOne(id);
      if (service) {
        if(!newService.rating_quantity){
          return null;
        }
        await getRepository(ServiceEntity).merge(service, {...newService, rating_quantity:service.rating_quantity + newService.rating_quantity});
        const updatedData = await getRepository(ServiceEntity).save(service);
        return updatedData;
      }
    } catch {
      return null;
    }
  }

  static async deleteService(id: string) {
    try {
      const service = await getRepository(ServiceEntity).findOne(id);
      if (service) {
        const data = await getConnection()
          .createQueryBuilder()
          .update(ServiceEntity)
          .delete()
          .where({ service_id: id })
          .execute();
        return data;
      }
    } catch {
      return null;
    }
  };

  static async whatsAppCall(service_id:string) {
    const currentService = await getRepository(ServiceEntity).findOne(service_id);
    if(!currentService){
      return new Error("Service not found");
    }
    const { phone_number } = currentService;
    return phone_number;
  }

}
