require("dotenv").config();
import { AppDataSource } from "./data-source";
import app from "./app";

const PORT = process.env.PORT || 3003;

AppDataSource.initialize()
  .then(async () => {
    // start express server
    app.listen(PORT, () =>
      console.log(
        `\u{1F525} Server starting on port ${PORT} - click here http://localhost:${PORT} to go to server`
      )
    );
  })
  .catch((error) => console.log("error on file Index.ts", error));
