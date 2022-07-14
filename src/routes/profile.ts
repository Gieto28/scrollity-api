import { Router } from "express";
import {
  getProfileAction,
  getAllProfilesAction,
  updateProfileAction,
  getProfilePostsAction,
} from "../actions/profile";

const routes: Router = Router();

routes.get("/:id", getProfileAction);
routes.get("/all", getAllProfilesAction);
routes.post("/update", updateProfileAction);
routes.get("/posts/:user_id/:option", getProfilePostsAction);

export default routes;
