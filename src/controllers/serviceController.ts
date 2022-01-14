import { Request, Response, NextFunction } from 'express';
import { ServiceRepository } from '../services/service';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';
import * as http from 'http';

export class ServiceController {

  static async createService(req: Request, res: Response, next: NextFunction) {
    try {
      const newService = req.body;
      const sendToServiceData = await ServiceRepository.createService(newService);
      res.status(StatusCode.CreateRequest).json(sendToServiceData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async getAllServices(req: Request, res: Response, next: NextFunction) {
    try {
      const sendToServiceData = await ServiceRepository.getAllServices();
      return res.status(200).json(sendToServiceData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async getService(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceId = req.params.id;
      const sendToServiceData = await ServiceRepository.getService(serviceId);
      if (!sendToServiceData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.SERVICE));
      }
      res.status(StatusCode.SuccessRequest).json(sendToServiceData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async updateService(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceId = req.params.id;
      const newService = req.body;

      const updateData = await ServiceRepository.updateService(
        serviceId,
        newService
      );
      if (!updateData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.SERVICE));
      }
      res.status(StatusCode.SuccessRequest).json(updateData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async deleteService(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceId = req.params.id;

      const sendToServiceData = await ServiceRepository.deleteService(
        serviceId
      );
      if (!sendToServiceData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.SERVICE));
      }
      res.status(200).json({
        message: 'Service successfully deleted.',
      });
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async callWhatsApp (req:Request, res:Response, next:NextFunction ) {
    try{
      const {service_id} = await req.body;
      const whatsPhoneNumber = await ServiceRepository.whatsAppCall(service_id);
      if(!whatsPhoneNumber){
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.SERVICE));
      }
      res.status(StatusCode.SuccessRequest).redirect(`wa.me/${whatsPhoneNumber}`);
    }catch (e){
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

}
