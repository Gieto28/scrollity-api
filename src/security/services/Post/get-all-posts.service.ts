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
            dateCreated: "DESC",
          },
          take: 10,
          relations: ["user", "comments"],
          select: {
            user: {
              _id: true,
            },
          },
        });
        return TopPosts;
      case "New":
        const NewPosts: Post[] = await table.find({
          order: {
            dateCreated: "DESC",
          },
          take: 10,
          relations: ["user", "comments"],
          select: {
            user: {
              _id: true,
            },
          },
        });
        return NewPosts;
      case "Random":
        const RandomPosts: Post[] = await table.find({
          relations: ["user", "comments"],
          take: 10,
        });
        return RandomPosts;
      default:
        const CategoryPosts: Post[] = await table.find({
          where: { category },
          take: 10,
          relations: ["user", "comments"],
          select: {
            user: {
              _id: true,
            },
          },
        });
        return CategoryPosts;
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export default getAllPosts;
