import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CommentEntity } from '../entities/Comment';
import { IComment, newComment } from '../interfaces';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {

  async createComment(newComment: newComment) {
    try {
      const comment = await getRepository(CommentEntity).create(newComment);
      await this.save(comment);
      return comment;
    } catch {
      return null;
    }
  }

  async getAllComments() {
    const comments = await this.createQueryBuilder('comment').getMany();
    return comments;
  }

  async getComment(commentId: string) {
    try {
      const comment = await this.createQueryBuilder('comment')
        .select()
        .where('comment_id = :query', { query: commentId })
        .getOne();
      return comment;
    } catch {
      return null;
    }
  }

  async updateComment(id: string, content: IComment) {
    try {
      const updatedComment = await this.createQueryBuilder('comment')
        .update(CommentEntity)
        .set({ ...content })
        .where('comment_id = :query', { query: id })
        .execute()
        .then(() => this.findOne(id));

      return updatedComment;
    } catch {
      return null;
    }
  }

  async deleteComment(id: string) {
    try {
      const data = await this.findOne(id);
      await this.createQueryBuilder('comment')
        .delete()
        .from(CommentEntity)
        .where('comment_id = :query', { query: id })
        .execute();

      return data;
    } catch {
      return null;
    }
  }
}
