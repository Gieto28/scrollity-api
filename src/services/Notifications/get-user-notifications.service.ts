import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity";
import { Notification } from "../../entity/Notification";

/**
 *
 * @param user_id user id being retrieved from the front end
 * @returns a post if successful
 */
const getUserNotifications = async (
  user_id: number
): Promise<Notification[]> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const notification_table: Repository<Notification> =
      manager.connection.getRepository(Notification);
    const user_table: Repository<User> = manager.connection.getRepository(User);

    const user: User = await user_table.findOne({
      where: { _id: user_id },
    });

    const notifications: Notification[] = await notification_table.find({
      where: { user: user },
    });

    return notifications;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getUserNotifications;
