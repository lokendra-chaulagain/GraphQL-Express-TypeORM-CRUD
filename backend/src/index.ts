import "reflect-metadata";
import { AppDataSource } from "./db";
import * as dotenv from "dotenv";
import app from "./app";
dotenv.config();

const port = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connection Successful");
    app.listen(port);
    console.log(`Server on http://localhost:${port}/graphql`);
  })
  .catch((error) => console.log(error));
