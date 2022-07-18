import { createQuery } from "mysql2/typings/mysql/lib/Connection";
import { createQueryBuilder, DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post } from "../../../entity/Post";

/**
 *
 *
 * @returns either status 200 (OK) **OR** status 400 (Bad Request)
 */
const getAllPosts = async (category: string): Promise<Post[]> => {
  try {
    const table: Repository<Post> =
      AppDataSource.manager.connection.getRepository(Post);

    switch (category) {
      // when TOP is selected it'll return the top posts of all time with the highest up votes
      case "Top":
        const TopPosts: Post[] = await table.find({
          relations: ["user", "comments", "likes"],
          order: {
            up_votes: "DESC",
            dateCreated: "DESC",
          },
          take: 10,
          select: {
            user: {
              _id: true,
            },
            likes: true,
          },
        });
        return TopPosts;

      // when NEW is selected it'll return posts from newest to oldest
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

      // when Random is selected, it's supposed to return posts randomly without any order whatsoever
      case "Random":
        // const RandomPosts = await createQueryBuilder(Post, "Post")
        //   .orderBy("RAND()")
        //   .limit(10)
        //   .getMany();
        const RandomPosts: Post[] = await table.find({
          relations: ["user", "comments"],
          take: 10,
        });
        return RandomPosts;

      // default is when category is neither TOP, NEW or RANDOM, but instead they're specific categories, like PET, FUNNY, HELP or OTHER
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
};

export default getAllPosts;
