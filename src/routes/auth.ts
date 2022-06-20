import { Router } from "express";
import {
  loginAction,
  getProfileAction,
  updateProfileAction,
  registerAction,
  getAllProfilesAction,
} from "../actions/auth";

const routes: Router = Router();

routes.post("/login", loginAction);

routes.post("/register", registerAction);

routes.post("/update", updateProfileAction);

routes.get("/profile/:id", getProfileAction);
routes.get("/profile/all", getAllProfilesAction);

export default routes;
