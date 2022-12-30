import { MongoClient, ObjectId } from "mongodb";
import { EnvironmentVariableNotFoundException } from "../../application/exceptions/EnvironmentVariableNotFoundException";
import { successConnetionMessage } from "./utils/connection-message.util";

const URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
if (!URL) throw new EnvironmentVariableNotFoundException();

const mongoClient: MongoClient = new MongoClient(URL);
const DB_NAME = "school";

declare global {
  var database: any;
}

const createConnection = async () => {
  await mongoClient.connect();
  const DB = mongoClient.db(DB_NAME);
  global.database = {
    mongo: DB,
    ObjectId: ObjectId,
  };
  return successConnetionMessage();
};

const closeConnection = async () => {
  await mongoClient.close();
};

const mongo = { createConnection, closeConnection };

export { mongo };
