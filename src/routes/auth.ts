import { Router } from "express";
import {
  loginAction,
  getProfileAction,
  updateProfileAction,
  registerAction,
  logoutAction,
  getAllProfilesAction,
} from "../actions/auth";

const routes = Router();

routes.post("/login", loginAction);

routes.post("/register", registerAction);

routes.post("/logout", logoutAction);

routes.get("/profile/:id", getProfileAction);
routes.get("/profile/all", getAllProfilesAction);
routes.post("/profile", updateProfileAction);

export default routes;
