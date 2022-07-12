import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Comment } from "../../../entity";

/**
 *
 *
 * @returns either status 200 (OK) **OR** status 400 (Bad Request)
 *
 * **Status 200 returns** - the status 200 and a json with an object with a title and data containing all the users in the db
 */
const getAllComments = async () => {
  try {
    const table: Repository<Comment> =
      AppDataSource.manager.connection.getRepository(Comment);

    const Comments: Comment[] = await table.find({
      relations: ["user", "post"],
      order: {
        up_votes: "DESC",
        dateCreated: "DESC",
      },
    });

    return Comments;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getAllComments;
