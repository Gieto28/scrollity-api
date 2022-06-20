import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post } from "../../../entity/Post";
import { User } from "../../../entity/User";

/**
 *
 * **ROUTE** auth/profiles
 *
 * @returns either status 200 (OK) **OR** status 400 (Bad Request)
 *
 * **Status 200 returns** - the status 200 and a json with an object with a title and data containing all the users in the db
 */
async function getAllPosts(category: string) {
  try {
    const table: Repository<Post> =
      AppDataSource.manager.connection.getRepository(Post);

    switch (category) {
      case "Top":
        const TopPosts: Post[] = await table.find({
          order: {
            up_votes: "ASC",
          },
          relations: ["user"],
        });
        return TopPosts;
      case "New":
        const NewPosts: Post[] = await table.find({
          order: {
            dateCreated: "ASC",
          },
          relations: ["user"],
        });
        return NewPosts;
      case "Random":
        const RandomPosts: Post[] = await table.find({
          relations: ["user"],
        });
        return RandomPosts;
      default:
        const CategoryPosts: Post[] = await table.find({
          where: { category },
          relations: ["user"],
        });
        return CategoryPosts;
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export default getAllPosts;
