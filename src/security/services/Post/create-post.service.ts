import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post } from "../../../entity/Post";
import { User } from "../../../entity/User";
import { SuccessResponse } from "../../../models";

/**
 *
 * @param user_id id of the creator of the post
 * @param title title of the post, required
 * @param description description of the post, optional
 * @param category category of the post, optional, default is "Other"
 * @param media_id name of the file
 * @returns
 */
const createPost = async (
  user_id: number,
  title: string,
  description: string | null,
  media_id: string | null,
  category: string
): Promise<SuccessResponse> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const post_table: Repository<Post> = manager.connection.getRepository(Post);
    const user_table: Repository<User> = manager.connection.getRepository(User);

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    const post: Post = new Post();
    post.user = user;
    post.title = title;
    post.media_id = media_id ?? null;
    post.description = description ?? null;
    post.category = category;
    post.dateCreated = new Date();

    await post_table.save(post);
    return { success: "created post successfully" };
  } catch (e) {
    throw new Error(e.message);
  }
};

export default createPost;
