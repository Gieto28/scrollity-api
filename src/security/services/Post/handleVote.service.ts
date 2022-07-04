import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post } from "../../../entity/Post";
import { User } from "../../../entity/User";

/**
 *
 * @param user_id creator of the post, string which is turned into a number when saved in the sql table
 * @param title title of the post, required
 * @param description description of the post, optional
 * @param category category of the post, optional, default is "Other"
 * @param media_id name of the file
 * @returns
 */
const handleVote = async (vote: string, post_id: number, user_id: number) => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const post_table: Repository<Post> = manager.connection.getRepository(Post);
    const user_table: Repository<User> = manager.connection.getRepository(User);

    const post: Post = await post_table.findOne({
      where: { _id: post_id },
      relations: ["likes"],
    });

    const user: User = await user_table.findOne({
      where: { _id: user_id },
      relations: ["likes"],
      select: {
        _id: true,
      },
    });

    switch (vote) {
      case "up":
        // if array is undefined then set it to an empty array first
        if (!post.likes) {
          post.likes = [];
        }
        if (!user.likes) {
          user.likes = [];
        }
        console.log("user post likes", post?.likes[0]);
        console.log("post likes id", user?.likes[0]?._id);
        // check if user liked the post
        if (post?.likes[0]?._id) {
          // reduce up_votes by one in sql
          post.up_votes = post.up_votes - 1;
          // filter out the user who liked the post
          post.likes = post.likes.filter(
            (l) => l._id !== post.likes[0]._id && user.likes.includes(user._id)
          );
          await manager.save(post);
          return { data: true };
        }

        post.up_votes = post.up_votes + 1;
        post.likes.push(user);
        await manager.save(post);
        console.log("post likes", post.likes);
        break;

      case "down":
        post.down_votes = post.down_votes + 1;
        await manager.save(post);
        break;

      default:
        throw new Error("vote was neither up nor down");
    }

    return { success: "created post successfully" };
  } catch (e) {
    console.log("error here now");
    throw new Error(e.message);
  }
};

export default handleVote;
