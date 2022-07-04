import { Router } from "express";
import {
  loginAction,
  updateProfileAction,
  registerAction,
} from "../actions/auth";

const routes: Router = Router();

routes.post("/login", loginAction);

routes.post("/register", registerAction);

routes.post("/update", updateProfileAction);

export default routes;
