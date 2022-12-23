import { afterAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { HttpCode } from "../../../../../src/application/domain/http-code";
import { createServer } from "../../../../../src/boot";

const httpServer = createServer();
const request = agent(httpServer);

afterAll((done) => {
  httpServer.close(done);
});

describe("GET /sections", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request.get("/api/v1/sections").send();
    console.log(response);
    expect(response.statusCode).toBe(HttpCode.OK);
  });
});
