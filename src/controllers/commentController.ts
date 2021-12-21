import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { CommentRepository } from '../services/comment';
import { CommentEntity } from '../entities/Comment';
import { IComment } from '../interfaces';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

const manager = () => getManager().getCustomRepository(CommentRepository);

export class CommentController {
  static async createComment(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    console.log(req?.userData);
    try {
      const { content, service_id} = req.body;
      const comment = new CommentEntity();
      comment.content = content.trim();
      comment.service_id = service_id;
      const commentData = await manager().createComment(comment);
      if (!commentData) {
        return next(HttpErr.notFound(ExceptionMessages.DB_ERROR));
      }
      res.status(StatusCode.CreateRequest).json(commentData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async getAllComments(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await manager().getAllComments();
      res.status(StatusCode.SuccessRequest).json(data);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async getComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const oneData = await manager().getComment(id);
      if (!oneData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.COMMENT));
      }
      res.status(StatusCode.SuccessRequest).json(oneData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { content } = req.body;
      const { id } = req.params;
      const data: IComment = {};
      data.content = content.trim();

      const updatedData = await manager().updateComment(id, data);
      if (!updatedData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.COMMENT));
      }
      res.status(StatusCode.SuccessRequest).json(updatedData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await manager().deleteComment(id);

      if (!data) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.COMMENT));
      }

      res.status(200).json({
        message: 'Comment successfully deleted.',
      });
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }
}
