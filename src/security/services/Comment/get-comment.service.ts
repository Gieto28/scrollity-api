import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Comment } from "../../../entity";
/**
 *
 * @param id id being retrieved from the front end
 * @returns a post if successful
 */
const getComment = async (id: number): Promise<Comment> => {
  try {
    const table: Repository<Comment> =
      AppDataSource.manager.connection.getRepository(Comment);

    const comment: Comment = await table.findOneOrFail({
      where: { _id: Number(id) },
      select: ["_id", "up_votes", "down_votes"],
    });

    return comment;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getComment;
