import { Like, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity";
/**
 *
 * @param id id being retrieved from the front end
 * @returns a post if successful
 */
const getPostByTitle = async (title: string): Promise<Post[]> => {
  try {
    const table: Repository<Post> =
      AppDataSource.manager.connection.getRepository(Post);

    const post: Post[] = await table.find({
      where: { title: Like(`%${title}%`) },
      select: [
        "_id",
        "title",
        "media_id",
        "description",
        "up_votes",
        "down_votes",
      ],
    });

    return post;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getPostByTitle;
