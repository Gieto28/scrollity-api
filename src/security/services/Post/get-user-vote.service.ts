import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post, Post_Likes_User, User } from "../../../entity";
/**
 *
 * @param id id being retrieved from the front end
 * @returns a post if successful
 */
const getUserVote = async (
  post_id: number,
  user_id: number
): Promise<Post_Likes_User> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const likes_table: Repository<Post_Likes_User> =
      manager.connection.getRepository(Post_Likes_User);
    const post_table: Repository<Post> = manager.connection.getRepository(Post);
    const user_table: Repository<User> = manager.connection.getRepository(User);

    const post: Post = await post_table.findOne({
      where: { _id: post_id },
    });

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    const votes: Post_Likes_User = await likes_table.findOne({
      where: { user: user, post: post },
    });

    return votes;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getUserVote;
