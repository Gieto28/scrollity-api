import { Router } from "express";
import { loginAction, registerAction } from "../actions/auth";

const routes: Router = Router();

routes.post("/login", loginAction);

routes.post("/register", registerAction);

export default routes;
