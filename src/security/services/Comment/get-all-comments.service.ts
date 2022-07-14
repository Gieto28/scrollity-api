import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Comment, Post } from "../../../entity";

/**
 *
 * @post_id id of the post which I want comments from
 *
 * @returns either status 200 (OK) **OR** status 400 (Bad Request)
 */
const getAllComments = async (post_id: string) => {
  try {
    const comment_table: Repository<Comment> =
      AppDataSource.manager.connection.getRepository(Comment);

    const post_table: Repository<Post> =
      AppDataSource.manager.connection.getRepository(Post);

    const post = await post_table.findOne({ where: { _id: Number(post_id) } });

    const comments: Comment[] = await comment_table.find({
      relations: ["user"],
      where: {
        post: post,
      },
      order: {
        up_votes: "DESC",
        dateCreated: "DESC",
      },
      select: {
        user: {
          _id: true,
          name: true,
          picture: true,
        },
      },
    });

    return comments;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getAllComments;
