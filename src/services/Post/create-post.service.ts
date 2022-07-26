import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
import { SuccessResponse } from "../../models";
import * as OneSignal from "@onesignal/node-onesignal";
import { client } from "../../one-signal";
import { Notification } from "../../entity/Notification";

/**
 *
 * @param user_id id of the creator of the post
 * @param title title of the post, required
 * @param description description of the post, optional
 * @param category category of the post, optional, default is "Other"
 * @param media_id name of the file
 * @returns
 */
const createPost = async (
  user_id: number,
  title: string,
  description: string | null,
  media_id: string | null,
  category: string
): Promise<SuccessResponse> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const post_table: Repository<Post> = manager.connection.getRepository(Post);
    const user_table: Repository<User> = manager.connection.getRepository(User);
    const notification_table: Repository<Notification> =
      manager.connection.getRepository(Notification);

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    const post: Post = new Post();
    post.user = user;
    post.title = title;
    post.media_id = media_id ?? null;
    post.description = description ?? null;
    post.category = category;
    post.dateCreated = new Date();

    try {
      const notification = new OneSignal.Notification();
      notification.app_id = process.env.ONESIGNAL_APP_ID;
      notification.template_id = process.env.POST_TEMPLATE_ID;
      notification.include_external_user_ids = [user_id.toString()];

      await client.createNotification(notification);
    } catch (error) {
      throw new Error(error.message);
    }

    const new_notification: Notification = new Notification();
    new_notification.user = user;
    new_notification.title = "Congrats! Your post has been published!";
    new_notification.body = "Thank you for sharing";
    new_notification.dateCreated = new Date();

    await notification_table.save(new_notification);
    await post_table.save(post);

    return { success: "created post successfully" };
  } catch (e) {
    throw new Error(e.message);
  }
};

export default createPost;
