import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post, Post_Likes_User, User } from "../../../entity";
/**
 *
 * @param id id being retrieved from the front end
 * @returns a post if successful
 */
const getUserPosts = async (
  user_id: number,
  option: string
): Promise<Post[] | Post_Likes_User[] | any> => {
  try {
    const table: Repository<Post> =
      AppDataSource.manager.connection.getRepository(Post);

    const user_table: Repository<User> =
      AppDataSource.manager.connection.getRepository(User);

    const post_likes_user: Repository<Post_Likes_User> =
      AppDataSource.manager.connection.getRepository(Post_Likes_User);

    if (option === "posts") {
      const user: User[] = await user_table.find({
        relations: ["posts"],
        where: { _id: user_id },
        select: {
          _id: true,
          posts: true,
        },
      });

      return user;
    }

    if (option === "likes") {
      const user: User[] = await user_table.find({
        relations: ["likes"],
        where: { _id: user_id },
        select: {
          _id: true,
          likes: true,
        },
      });

      console.log(user);

      return user;
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getUserPosts;
