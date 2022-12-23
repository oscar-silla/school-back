import { MongoClient, ObjectId } from "mongodb";
import { EnvironmentVariableNotFoundException } from "../../application/exceptions/EnvironmentVariableNotFoundException";

const URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
if (!URL) throw new EnvironmentVariableNotFoundException();

const client: MongoClient = new MongoClient(URL);
const DB_NAME = "school";

declare global {
  var database: any;
}

(async () => {
  await client.connect();
  const DB = client.db(DB_NAME);
  global.database = {
    mongo: DB,
    ObjectId: ObjectId,
  };
  return `MongoDB is connected ✅`;
})()
  .then(console.log)
  .catch(console.error);
//.finally(() => client.close());

export { client };
