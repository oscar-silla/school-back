import { MongoClient, ObjectId } from "mongodb";

const URL = "mongodb://0.0.0.0:27017/";
const CLIENT = new MongoClient(URL);
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
  .catch(console.error)
  .finally(() => CLIENT.close());
