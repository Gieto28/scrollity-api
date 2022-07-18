import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Comment, User, Comment_Likes_User } from "../../../entity";
/**
 *
 * @param id id being retrieved from the front end
 * @returns a post if successful
 */
const getUserCommentVote = async (
  comment_id: number,
  user_id: number
): Promise<Comment_Likes_User> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const likes_table: Repository<Comment_Likes_User> =
      manager.connection.getRepository(Comment_Likes_User);
    const comment_table: Repository<Comment> =
      manager.connection.getRepository(Comment);
    const user_table: Repository<User> = manager.connection.getRepository(User);

    const comment: Comment = await comment_table.findOne({
      where: { _id: comment_id },
    });

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    const votes: Comment_Likes_User = await likes_table.findOne({
      where: { user: user, comment: comment },
    });

    return votes;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getUserCommentVote;
