import { Request, Response } from "express";
import getUserNotifications from "../../services/Notifications/get-user-notifications.service";

const action = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const data: any = await getUserNotifications(Number(user_id));

    return res.status(200).json(data);
  } catch (e) {
    return res.status(403).json({
      code: 403,
      error: "Error when fetching notifications",
      message: e.message,
    });
  }
};

export default action;
