import { Request, Response } from "express";
import { updateNotification } from "../../services";

const action = async (req: Request, res: Response) => {
  try {
    const { notification_id } = req.params;
    const data: any = await updateNotification(Number(notification_id));

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json({
      code: 400,
      error: "Error when updating notification",
      message: e.message,
    });
  }
};

export default action;
