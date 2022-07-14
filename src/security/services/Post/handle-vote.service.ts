import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post, Post_Likes_User, User } from "../../../entity";

/**
 *
 *
 * @param user_id id of the user that liked this post
 * @param post_id id of the post
 * @param vote which vote the user did, either 1 for up vote or 0 for down vote
 * @returns
 */
const handleVote = async (vote: number, post_id: number, user_id: number) => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const post_table: Repository<Post> = manager.connection.getRepository(Post);
    const user_table: Repository<User> = manager.connection.getRepository(User);
    const likes_table: Repository<Post_Likes_User> =
      manager.connection.getRepository(Post_Likes_User);

    const post: Post = await post_table.findOne({
      where: { _id: post_id },
    });

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    const post_likes_user: Post_Likes_User = await likes_table.findOne({
      where: { user: user, post: post },
    });

    // user tries to vote but there's no data in db so we create one
    if (!post_likes_user) {
      const post_likes_table_row = new Post_Likes_User();

      post_likes_table_row.post = post;
      post_likes_table_row.user = user;

      vote === 1 ? (post.up_votes += 1) : null;

      vote === 0 ? (post.down_votes += 1) : null;

      post_likes_table_row.vote = vote === 1 ? 1 : 0;
      post_likes_table_row.date = new Date();

      await manager.save(post_likes_table_row);
      await manager.save(post);
    }

    // if user already voted and tries to vote then this happens
    if (post_likes_user && vote === 1) {
      if (post_likes_user.vote === 1) {
        post.up_votes -= 1;
        await likes_table.delete(post_likes_user);
      }
      if (post_likes_user.vote === 0) {
        post_likes_user.vote = 1;
        post.down_votes -= 1;
        post.up_votes += 1;
        await manager.save(post_likes_user);
      }
      await manager.save(post);
    }

    // if user already voted and tries to vote then this happens
    if (post_likes_user && vote === 0) {
      if (post_likes_user.vote === 0) {
        post.down_votes -= 1;
        await likes_table.delete(post_likes_user);
      }
      if (post_likes_user.vote === 1) {
        post_likes_user.vote = 0;
        post.up_votes -= 1;
        post.down_votes += 1;
        await manager.save(post_likes_user);
      }
      await manager.save(post);
    }

    return { success: "vote saved successfully" };
  } catch (e) {
    throw new Error(e.message);
  }
};

export default handleVote;
