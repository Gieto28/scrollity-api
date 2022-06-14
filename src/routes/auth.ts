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

routes.get("/profile", getProfileAction);
routes.get("/profiles", getAllProfilesAction);
routes.post("/update", updateProfileAction);

export default routes;
