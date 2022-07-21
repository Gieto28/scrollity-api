import { FindRelationsNotFoundError, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Post, Post_Likes_User, User } from "../../entity";
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
    const user_table: Repository<User> =
      AppDataSource.manager.connection.getRepository(User);

    const post_likes_user: Repository<Post_Likes_User> =
      AppDataSource.manager.connection.getRepository(Post_Likes_User);

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    if (option === "posts") {
      const posts: User[] = await user_table.find({
        relations: ["posts"],
        where: { _id: user_id },
        select: {
          _id: true,
          posts: true,
        },
      });

      return posts;
    }

    if (option === "likes") {
      const likes: Post_Likes_User[] = await post_likes_user.find({
        relations: ["post"],
        where: { user: user, vote: 1 },
      });

      let liked_posts: any = [];

      likes.map((l) => {
        liked_posts.push(l.post);
      });

      return liked_posts;
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getUserPosts;
