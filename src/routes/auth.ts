import { Router } from "express";
import {
  loginAction,
  getProfileAction,
  updateProfileAction,
  registerAction,
  getAllProfilesAction,
} from "../actions/auth";

const routes = Router();

routes.post("/login", loginAction);

routes.post("/register", registerAction);

routes.post("/update", updateProfileAction);

routes.get("/profile", getProfileAction);
routes.get("/profiles", getAllProfilesAction);

export default routes;
