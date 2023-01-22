import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { HttpCode } from "../src/application/domain/http-code";
import { Section } from "../src/application/domain/section";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

const section = new Section("Home", "Home description", "home.jpg", "");

describe("/sections", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });

  afterAll(async () => {
    httpServer.close();
    await mongo.closeConnection();
  });

  test("should respond with a 404 status code when not found sections", async () => {
    const response = await request.get("/api/v1/sections").send();
    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test("should respond with a 404 status code when not found specific section", async () => {
    const response = await request.get("/api/v1/sections/home").send();
    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test("should respond with a 404 status code when try to modify an inexisting section", async () => {
    section.setImg("nosection.jpg");
    const response = await request
      .patch("/api/v1/sections/nosection")
      .send(section);
    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    section.setImg("home.jpg");
  });

  test("should respond with a 201 status code when create a new section", async () => {
    const response = await request.post("/api/v1/sections").send(section);
    expect(response.statusCode).toBe(HttpCode.CREATED);
  });

  test("should response with a 200 status code when modify an existing section", async () => {
    section.setImg("anotherImage.jpg");
    const response = await request.patch("/api/v1/sections/home").send(section);
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test("should respond with a 200 status code when find existing sections", async () => {
    const response = await request.get("/api/v1/sections").send();
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test("should respond with a 200 status code when find an existing section", async () => {
    const response = await request.get("/api/v1/sections/home").send();
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test("should respond with a 404 status code when try to delete an inexisting section", async () => {
    const response = await request.delete("/api/v1/sections/nosection").send();
    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test("should respond with a 204 status code with delete an existing section", async () => {
    const response = await request.delete("/api/v1/sections/home").send();
    expect(response.statusCode).toBe(HttpCode.NO_CONTENT);
  });
});
