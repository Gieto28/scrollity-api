import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity";
/**
 *
 * @param id id being retrieved from the front end
 * @returns a post if successful
 */
const getPost = async (id: number): Promise<Post> => {
  try {
    const table: Repository<Post> =
      AppDataSource.manager.connection.getRepository(Post);

    const post: Post = await table.findOneOrFail({
      where: { _id: Number(id) },
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

export default getPost;
