import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post } from "../../../entity/Post";
import { User } from "../../../entity/User";

/**
 *
 * @param user_id creator of the post, string which is turned into a number when saved in the sql table
 * @param title title of the post, required
 * @param description description of the post, optional
 * @param category: category of the post, optional, default is "Other"
 * @param filename: file name with place it belongs to, file type, random uuid and ext
 * @returns
 */
async function createPost(
  user_id: number,
  title: string,
  description: string | null,
  category: string,
  filename: string | null
) {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const post_table: Repository<Post> = manager.connection.getRepository(Post);
    const user_table: Repository<User> = manager.connection.getRepository(User);

    const user = await user_table.findOne({ where: { _id: Number(user_id) } });

    console.log(user);

    const post = new Post();
    post.user = user;
    post.title = title;
    post.media = filename;
    post.description = description;
    post.category = category;
    post.dateCreated = new Date();

    console.log(post);

    await post_table.save(post);
    return { upload: "success" };
  } catch (e) {
    console.log("error here now");
    throw new Error(e.message);
  }
}

export default createPost;
