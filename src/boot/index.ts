require("dotenv").config({
  path: `${__dirname}/env/${process.env.NODE_ENV}.env`,
});
import { mongo } from "../infrastructure/database/mongo";
import app from "./app";

const createServer = () => {
  const port: number = process.env.PORT ? +process.env.PORT : 3010;
  return app.listen(port, () =>
    console.log(`Server is listening on port ${port}`)
  );
};

if (process.env.NODE_ENV !== "test") {
  (async () => {
    await mongo.createConnection();
  })();
  createServer();
}

export { createServer };
