import { Router } from "express";
import { getProfileAction, getAllProfilesAction } from "../actions/profile";

const routes: Router = Router();

routes.get("/:id", getProfileAction);
routes.get("/all", getAllProfilesAction);

export default routes;
