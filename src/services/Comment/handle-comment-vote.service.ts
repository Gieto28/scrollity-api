import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comment, Comment_Likes_User, User } from "../../entity";
import { SuccessResponse } from "../../models";

/**
 *
 *
 * @param user_id id of the user that liked this comment
 * @param comment_id id of the comment
 * @param vote which vote the user did, either 1 for up vote or 0 for down vote
 * @returns
 */
const handleCommentVote = async (
  vote: number,
  comment_id: number,
  user_id: number
): Promise<SuccessResponse> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const comment_table: Repository<Comment> =
      manager.connection.getRepository(Comment);
    const user_table: Repository<User> = manager.connection.getRepository(User);

    const likes_table: Repository<Comment_Likes_User> =
      manager.connection.getRepository(Comment_Likes_User);

    const comment: Comment = await comment_table.findOne({
      where: { _id: comment_id },
    });

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    const comment_likes_user: Comment_Likes_User = await likes_table.findOne({
      where: { user: user, comment: comment },
    });

    // user tries to vote but there's no data in db so we create one
    if (!comment_likes_user) {
      const comment_likes_table_row: Comment_Likes_User =
        new Comment_Likes_User();

      comment_likes_table_row.comment = comment;
      comment_likes_table_row.user = user;

      vote === 1 ? (comment.up_votes += 1) : null;

      vote === 0 ? (comment.down_votes += 1) : null;

      comment_likes_table_row.vote = vote === 1 ? 1 : 0;
      comment_likes_table_row.date = new Date();

      await manager.save(comment_likes_table_row);
      await manager.save(comment);
    }

    // if user already voted and tries to vote then this happens
    if (comment_likes_user && vote === 1) {
      if (comment_likes_user.vote === 1) {
        comment.up_votes -= 1;
        await likes_table.delete(comment_likes_user);
      }
      if (comment_likes_user.vote === 0) {
        comment_likes_user.vote = 1;
        comment.down_votes -= 1;
        comment.up_votes += 1;
        await manager.save(comment_likes_user);
      }
      await manager.save(comment);
    }

    // if user already voted and tries to vote then this happens
    if (comment_likes_user && vote === 0) {
      if (comment_likes_user.vote === 0) {
        comment.down_votes -= 1;
        await likes_table.delete(comment_likes_user);
      }
      if (comment_likes_user.vote === 1) {
        comment_likes_user.vote = 0;
        comment.up_votes -= 1;
        comment.down_votes += 1;
        await manager.save(comment_likes_user);
      }
      await manager.save(comment);
    }

    return { success: "vote saved successfully" };
  } catch (e) {
    throw new Error(e.message);
  }
};

export default handleCommentVote;
