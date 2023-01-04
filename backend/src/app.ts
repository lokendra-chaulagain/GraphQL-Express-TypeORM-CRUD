import express from "express";
const app = express();
import cors from "cors";
import { schema } from "./schema";
import { graphqlHTTP } from "express-graphql";

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

export default app;
