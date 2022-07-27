import bcrypt from "bcrypt";
import { userInfo } from "os";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Notification } from "../../entity/Notification";
import { User } from "../../entity/User";
import { SuccessResponse } from "../../models";
import createToken from "../Auth/token.service";

/**
 *
 * @param _id _id used to find the user using findOne() method
 * @param name used to change the name of the user, it'll check if name is null or if it has value, if it has value it'll replace it with the value, if it's null it'll stay the same
 * @param password user to change the password of the user, if it has value it'll replace it with the value, if it's null it'll stay the same
 * @returns a new token to be used by the front end and to be stored in the AsyncStorage
 */
const updateNotification = async (
  notification_id: number
): Promise<SuccessResponse> => {
  try {
    const manager: EntityManager = AppDataSource.manager;
    const table: Repository<Notification> =
      manager.connection.getRepository(Notification);

    const notification: Notification = await table.findOne({
      where: { _id: notification_id },
    });

    if (notification.seen) {
      return;
    }

    !notification.seen && (notification.seen = true);

    await manager.save(notification);

    return { success: "successful update" };
  } catch (e) {
    throw new Error(e.message);
  }
};

export default updateNotification;
