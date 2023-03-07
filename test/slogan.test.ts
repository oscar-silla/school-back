import { createServer } from "../src/boot";
import { agent } from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { mongo } from "../src/infrastructure/database/mongo";
import { baseUrl, fakeId } from "../src/application/constants";
import { Slogan } from "../src/application/domain/slogan";
import { HttpStatus } from "../src/application/domain/http-status";

const httpServer = createServer();
const request = agent(httpServer);

const slogan: Slogan = new Slogan(
  "Slogan title",
  "Slogan description",
  "slogan.png",
  "SHOW MORE",
  "http://localhost"
);

const commonHeaders = {
  authorization: process.env.token,
};

describe("Slogan tests", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });
  afterAll(async () => {
    await mongo.closeConnection();
    httpServer.close();
  });
  test("should respond with a 401 status code when try to create new slogan without token", async () => {
    const res = await request.post(`${baseUrl}/slogan`).send(slogan);
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to modify an existing slogan without token", async () => {
    const res = await request.patch(`${baseUrl}/slogan`).send(slogan);
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to delete an existing slogan without token", async () => {
    const res = await request.delete(`${baseUrl}/slogan/${fakeId}`).send();
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 400 status code when try to get slogan with bad format id", async () => {
    const res = await request
      .get(`${baseUrl}/slogan/1234`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to create slogan with null title", async () => {
    slogan.setTitle("");
    const res = await request
      .post(`${baseUrl}/slogan`)
      .set(commonHeaders)
      .send(slogan);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to create slogan with null description", async () => {
    slogan.setTitle("Slogan title");
    slogan.setDescription("");
    const res = await request
      .post(`${baseUrl}/slogan`)
      .set(commonHeaders)
      .send(slogan);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to create slogan with null img", async () => {
    slogan.setDescription("Slogan description");
    slogan.setImg("");
    const res = await request
      .post(`${baseUrl}/slogan`)
      .set(commonHeaders)
      .send(slogan);
    slogan.setImg("slogan.png");
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to delete slogan with bad id format", async () => {
    const res = await request
      .delete(`${baseUrl}/slogan/1234`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 404 status code when try to get all slogans but don't exists anyone", async () => {
    const res = await request
      .get(`${baseUrl}/slogan`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 404 status code when try to get specific slogan but don't exists anyone", async () => {
    const res = await request
      .get(`${baseUrl}/slogan/${fakeId}`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 404 status code when try to modify specific slogan but don't exists anyone", async () => {
    const res = await request
      .patch(`${baseUrl}/slogan/${fakeId}`)
      .set(commonHeaders)
      .send(slogan);
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 404 status code when try to delete specific slogan but don't exists anyone", async () => {
    const res = await request
      .delete(`${baseUrl}/slogan/${fakeId}`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
