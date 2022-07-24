require("dotenv").config();
import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
  .then(async () => {
    // start express server
    app.listen(process.env.PORT || 3003, () =>
      console.log(
        `\u{1F525} Server starting on port ${process.env.PORT || 3003}`
      )
    );
  })
  .catch((error) => console.log("error on file Index.ts", error));
