import { MongoClient, ObjectId } from "mongodb";
import { EnvironmentVariableNotFoundException } from "../../application/exceptions/EnvironmentVariableNotFoundException";
import { successConnetionMessage } from "./utils/connection-message.util";
import { Environment } from "../../boot/constants";

const URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
if (!URL) throw new EnvironmentVariableNotFoundException();

const mongoClient: MongoClient = new MongoClient(URL);
const DB_NAME =
  process.env.NODE_ENV === Environment.test ? "school_test" : "school";

declare global {
  var database: any;
}

const createConnection = async (): Promise<void> => {
  await mongoClient.connect();
  const DB = mongoClient.db(DB_NAME);
  global.database = {
    mongo: DB,
    ObjectId: ObjectId,
  };
  return successConnetionMessage();
};

const closeConnection = async (): Promise<void> => {
  await mongoClient.close();
};

const mongo = { createConnection, closeConnection };

export { mongo };
