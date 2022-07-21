import { FindRelationsNotFoundError, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Post, Post_Likes_User, User } from "../../entity";
/**
 *
 * @param id id being retrieved from the front end
 * @returns a post if successful
 */
const getHighestVotedPosts = async (user_id: number): Promise<User[]> => {
  try {
    const user_table: Repository<User> =
      AppDataSource.manager.connection.getRepository(User);

    const posts: User[] = await user_table.find({
      where: { _id: user_id },
      take: 3,
      relations: ["posts"],
      select: {
        _id: true,
        posts: true,
      },
    });

    return posts;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getHighestVotedPosts;
