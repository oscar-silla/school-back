import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { agent } from "supertest";
import { HttpCode } from "../../../../../src/application/domain/http-code";
import { createServer } from "../../../../../src/boot";
import { client } from "../../../../../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

describe("GET /sections", () => {
  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    httpServer.close();
    await client.close();
  });

  it("should respond with a 404 status code when not found sections", async () => {
    const response = await request.get("/api/v1/sections").send();
    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  /* it("should respond with a 200 status code", async () => {
    const response = await request.get("/api/v1/sections").send();
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  it("should return a section list with at least one section", async () => {
    const response = await request.get("/api/v1/sections");
    console.log(response);
    expect(response.body.length).toBeGreaterThan(0);
  }); */
});
