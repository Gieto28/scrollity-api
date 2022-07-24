import { Request, Response } from "express";
import { SuccessResponse } from "../../models";
import updateProfileImage from "../../services/Profile/update-profile-image.service";

const action = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id, media_id } = req.body;

    const data: SuccessResponse = await updateProfileImage(user_id, media_id);

    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({
      code: 400,
      error: "error while updating profile image",
      message: e.message,
    });
  }
};

export default action;
