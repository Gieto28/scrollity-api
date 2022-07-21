import { Router } from "express";
import { getHighestVotedPosts } from "../services";

const routes: Router = Router();

routes.get("/highestVoted/:user_id", getHighestVotedPosts);

export default routes;
