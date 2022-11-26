import { MongoClient, ObjectId } from "mongodb";
import { EnvironmentVariableNotFoundException } from "../../application/exceptions/EnvironmentVariableNotFoundException";

const URL = process.env.MONGO_URL;
if (!URL) throw new EnvironmentVariableNotFoundException();

const CLIENT: MongoClient = new MongoClient(URL);
const DB_NAME = "school";

declare global {
  var database: any;
}

(async () => {
  await CLIENT.connect();
  const DB = CLIENT.db(DB_NAME);
  global.database = {
    mongo: DB,
    ObjectId: ObjectId,
  };
  return `MongoDB is connected ✅`;
})()
  .then(console.log)
  .catch(console.error);
//.finally(() => CLIENT.close());
