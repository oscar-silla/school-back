import { createServer } from "../src/boot";
import { agent } from "supertest";
import { afterAll, beforeAll, describe, test } from "@jest/globals";
import { mongo } from "../src/infrastructure/database/mongo";
import { baseUrl } from "../src/application/constants";

const httpServer = createServer();
const request = agent(httpServer);

describe("Slogan tests", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });
  afterAll(async () => {
    await mongo.closeConnection();
    httpServer.close();
  });
  test("should respond with a 401 status code when try to create new slogan without token", async () => {
    const res = await request.post(`${baseUrl}/slogan`);
  });
});
