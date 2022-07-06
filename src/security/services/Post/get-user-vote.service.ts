import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post, Post_Likes_User, User } from "../../../entity";
/**
 *
 * @param id id being retrieved from the front end
 * @returns a post if successful
 */
const getUserVote = async (post_id: number, user_id: number) => {
  const manager = AppDataSource.manager;
  try {
    const likes_table = manager.connection.getRepository(Post_Likes_User);
    const post_table = manager.connection.getRepository(Post);
    const user_table = manager.connection.getRepository(User);

    const post = await post_table.findOne({
      where: { _id: post_id },
    });

    const user = await user_table.findOne({
      where: { _id: user_id },
    });

    const votes = await likes_table.findOne({
      where: { user: user, post: post },
      select: {
        vote: true,
      },
    });

    return votes;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getUserVote;
