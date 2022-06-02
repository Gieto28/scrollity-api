import express from "express";
import cors from "cors";
import routes from "./routes/index";
// import {verifyToken} from ".security/middleware/token.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(veryToken);
app.use(routes);

export default app;
