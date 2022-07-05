import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Post, Post_Likes_User, User } from "../../../entity";

/**
 *
 * @param user_id id of the user that liked this post
 * @param post_id id of the post
 * @param vote which vote the user did, either 1 for like and 0 for not like
 * @returns
 */
const handleVote = async (vote: number, post_id: number, user_id: number) => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const post_table: Repository<Post> = manager.connection.getRepository(Post);
    const user_table: Repository<User> = manager.connection.getRepository(User);
    const post_likes_user_table: Repository<Post_Likes_User> =
      manager.connection.getRepository(Post_Likes_User);

    const post: Post = await post_table.findOne({
      where: { _id: post_id },
    });

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    const post_likes_user: Post_Likes_User =
      await post_likes_user_table.findOne({
        where: { user: user, post: post },
      });

    if (!post_likes_user) {
      const post_likes_table_row = new Post_Likes_User();

      post_likes_table_row.post = post;
      post_likes_table_row.user = user;

      vote === 1 ? (post.up_votes += 1) : null;
      vote === 1 ? console.log("new vote - like") : null;
      vote === 0 ? (post.down_votes += 1) : null;
      vote === 0 ? console.log("new vote - not like") : null;

      post_likes_table_row.vote = vote === 1 ? 1 : 0;

      post_likes_table_row.date = new Date();
      await manager.save(post_likes_table_row);
      await manager.save(post);
    }

    // if user has voted and tries to vote then this happens
    if (post_likes_user && vote === 1) {
      if (post_likes_user.vote === 1) {
        console.log("one up  ");
        post.up_votes -= 1;
        await post_likes_user_table.delete(post_likes_user);
      }
      if (post_likes_user.vote === 0) {
        console.log("one down ");
        post_likes_user.vote = 1;
        post.down_votes -= 1;
        post.up_votes += 1;
        await manager.save(post_likes_user);
      }
      await manager.save(post);
    }

    // if user already voted and tries to down vote then this happens
    if (post_likes_user && vote === 0) {
      if (post_likes_user.vote === 0) {
        console.log("zero down ");
        post.down_votes -= 1;
        await post_likes_user_table.delete(post_likes_user);
      }
      if (post_likes_user.vote === 1) {
        console.log("zero up ");
        post_likes_user.vote = 0;
        post.up_votes -= 1;
        post.down_votes += 1;
        await manager.save(post_likes_user);
      }
      await manager.save(post);
    }

    return { success: "created post successfully" };
  } catch (e) {
    console.log("error here now");
    throw new Error(e.message);
  }
};

export default handleVote;

// switch (vote) {
//   case "up":
//     // if array is undefined then set it to an empty array first
//     if (!post.likes) {
//       post.likes = [];
//     }
//     if (!user.likes) {
//       user.likes = [];
//     }
//     console.log("user post likes", post?.likes[0]);
//     console.log("post likes id", user?.likes[0]?._id);
//     // check if user liked the post
//     if (post?.likes[0]?._id) {
//       // reduce up_votes by one in sql
//       post.up_votes = post.up_votes - 1;
//       // filter out the user who liked the post
//       post.likes = post.likes.filter(
//         (l) => l._id !== post.likes[0]._id && user.likes.includes(post)
//       );
//       await manager.save(post);
//       return { data: true };
//     }

//     post.up_votes = post.up_votes + 1;
//     post.likes.push(user);
//     await manager.save(post);
//     console.log("post likes", post.likes);
//     break;

//   case "down":
//     post.down_votes = post.down_votes + 1;
//     await manager.save(post);
//     break;

//   default:
//     throw new Error("vote was neither up nor down");
// }
