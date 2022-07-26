import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entity";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
import { SuccessResponse } from "../../models";
import * as OneSignal from "@onesignal/node-onesignal";
import { client } from "../../one-signal";
import { Notification } from "../../entity/Notification";

/**
 *
 * @param user_id id of the creator of the comment
 * @param post_id id of the post
 * @param comment comment the user made
 * @returns success or error
 */
const createComment = async (
  user_id: number,
  post_id: number,
  comment: string
): Promise<SuccessResponse> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const post_table: Repository<Post> = manager.connection.getRepository(Post);
    const user_table: Repository<User> = manager.connection.getRepository(User);
    const comment_table: Repository<Comment> =
      manager.connection.getRepository(Comment);
    const notification_table: Repository<Notification> =
      manager.connection.getRepository(Notification);

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    const post: Post = await post_table.findOne({
      where: { _id: post_id },
    });

    const new_comment: Comment = new Comment();
    new_comment.user = user;
    new_comment.post = post;
    new_comment.comment = comment;
    new_comment.dateCreated = new Date();

    try {
      const notification = new OneSignal.Notification();
      notification.app_id = process.env.ONESIGNAL_APP_ID;
      notification.template_id = process.env.COMMENT_TEMPLATE_ID;
      notification.include_external_user_ids = [user_id.toString()];

      await client.createNotification(notification);
    } catch (error) {
      throw new Error(error.message);
    }

    const new_notification: Notification = new Notification();
    new_notification.user = user;
    new_notification.title = "Congrats! Your comment has been published!";
    new_notification.body = "Thank you for sharing";
    new_notification.dateCreated = new Date();

    await notification_table.save(new_notification);
    await comment_table.save(new_comment);
    return { success: "created comment successfully" };
  } catch (e) {
    throw new Error(e.message);
  }
};

export default createComment;
