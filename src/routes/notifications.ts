import { Router } from "express";
import {
  getUserNotificationsAction,
  updateNotificationAction,
} from "../actions/notifications";

const routes: Router = Router();

routes.get("/:user_id", getUserNotificationsAction);
routes.post("/update/:notification_id", updateNotificationAction);

export default routes;
