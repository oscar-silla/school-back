import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { baseUrl } from "../src/application/constants";
import { HttpCode } from "../src/application/domain/http-code";
import { Section } from "../src/application/domain/section";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

const sectionMock = new Section("Home", "Home description", "home.jpg", "");
const fakeRef = "fake";

const commonHeaders = {
  authorization: process.env.TOKEN,
};

describe("/sections", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });

  afterAll(async () => {
    httpServer.close();
    await mongo.closeConnection();
  });
  test("should respond with a 401 status code when try to create section with invalid auth in request headers", async () => {
    const res = await request.post(`${baseUrl}/sections`).send(sectionMock);
    expect(res.statusCode).toBe(HttpCode.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to modify section with invalid auth in request headers", async () => {
    const res = await request
      .patch(`${baseUrl}/sections/${fakeRef}`)
      .send(sectionMock);
    expect(res.statusCode).toBe(HttpCode.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to delete section with invalid auth in request headers", async () => {
    const res = await request.delete(`${baseUrl}/sections/${fakeRef}`).send();
    expect(res.statusCode).toBe(HttpCode.UNAUTHORIZED);
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
    sectionMock.setImg("nosection.jpg");
    const response = await request
      .patch("/api/v1/sections/nosection")
      .set(commonHeaders)
      .send(sectionMock);
    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    sectionMock.setImg("home.jpg");
  });
  test("should respond with a 201 status code when create a new section", async () => {
    const response = await request
      .post("/api/v1/sections")
      .set(commonHeaders)
      .send(sectionMock);
    expect(response.statusCode).toBe(HttpCode.CREATED);
  });
  test("should response with a 200 status code when modify an existing section", async () => {
    sectionMock.setImg("anotherImage.jpg");
    const response = await request
      .patch("/api/v1/sections/home")
      .set(commonHeaders)
      .send(sectionMock);
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
    const response = await request
      .delete("/api/v1/sections/nosection")
      .set(commonHeaders)
      .send();
    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test("should respond with a 204 status code with delete an existing section", async () => {
    const response = await request
      .delete("/api/v1/sections/home")
      .set(commonHeaders)
      .send();
    expect(response.statusCode).toBe(HttpCode.NO_CONTENT);
  });
});
