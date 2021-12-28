import { ruleRepository } from '../services/rule';
import { NextFunction, Request, Response } from 'express';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

export class ruleController {
  static async getRules(req: Request, res: Response, next: NextFunction) {
    try {
      const ruleData = await ruleRepository.getRules();
      if (!ruleData) {
        next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.RULES));
      }
      return res.status(StatusCode.SuccessRequest).json(ruleData);
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };

  static async getRuleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const ruleData = await ruleRepository.getRuleById(id);
      if (!ruleData) {
        next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.RULE));
      };
      return res.status(StatusCode.SuccessRequest).json(ruleData);
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  };
};

