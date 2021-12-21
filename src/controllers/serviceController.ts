import { Request, Response, NextFunction } from 'express';
import { ServiceRepository } from '../services/service';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

export class ServiceController {

  static async createService(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("1");
      const newService = req.body;
      console.log("2");

      const sendToServiceData = await ServiceRepository.createService(
        newService
      );
      console.log("3");

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

}
