import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { baseUrl } from "../src/application/constants";
import { HttpStatus } from "../src/application/domain/http-status";
import { LastNew } from "../src/application/domain/last-new";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

let generatedId: string;
const fakeId = "63b04cf26cff5203de1659ca";
const lastNewMock: LastNew = new LastNew(
  "Last new title",
  "Last new description",
  "lastNew.png",
  "<h1>Last new</h1>",
  "#393B90B2"
);
const emptyLastNewMock: LastNew = new LastNew();

const commonHeaders = {
  authorization: process.env.TOKEN,
};

describe("Last new tests", (): void => {
  beforeAll(async () => {
    await mongo.createConnection();
  });
  afterAll(async () => {
    await mongo.closeConnection();
    httpServer.close();
  });
  test("should respond with a 401 status code when try to create last new with invalid auth in request headers", async (): Promise<void> => {
    const res = await request.post(`${baseUrl}/lastNews`).send(lastNewMock);
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to modify last new with invalid auth in request headers", async (): Promise<void> => {
    const res = await request
      .patch(`${baseUrl}/lastNews/${lastNewMock.getId()}`)
      .send(lastNewMock);
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("sould respond with a 401 status code when try to delete last new with invalid auth in request headers", async (): Promise<void> => {
    const res = await request
      .delete(`${baseUrl}/lastNews/${lastNewMock.getId()}`)
      .send();
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 400 status code when try to modify last new with wrong id", async (): Promise<void> => {
    const res = await request
      .patch(`${baseUrl}/lastNews/1234`)
      .set(commonHeaders)
      .send(lastNewMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to delete last new with wrong id", async (): Promise<void> => {
    const res = await request
      .delete(`${baseUrl}/lastNews/1234`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to modify last new without body params", async (): Promise<void> => {
    const res = await request
      .patch(`${baseUrl}/lastNews/${fakeId}`)
      .set(commonHeaders)
      .send(emptyLastNewMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 404 status code when try to get one last new that not exists", async (): Promise<void> => {
    const res = await request.get(`${baseUrl}/lastNews/${fakeId}`).send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with 400 status code when tr to get one last new with wrong id", async (): Promise<void> => {
    const res = await request.get(`${baseUrl}/lastNews/1234`).send();
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to create new last new with null title", async (): Promise<void> => {
    lastNewMock.setTitle("");
    const res = await request
      .post(`${baseUrl}/lastNews`)
      .set(commonHeaders)
      .send(lastNewMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
    lastNewMock.setTitle("Last new title");
  });
  test("should respond with a 400 status code when try to create new last new with null content", async () => {
    lastNewMock.setContent("");
    const res = await request
      .post(`${baseUrl}/lastNews`)
      .set(commonHeaders)
      .send(lastNewMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
    lastNewMock.setContent("<h1>Last new</h1>");
  });
  test("should respond with a 201 status code when create a new last new", async () => {
    const res = await request
      .post(`${baseUrl}/lastNews`)
      .set(commonHeaders)
      .send(lastNewMock);
    generatedId = res?.body?.generatedId;
    expect(generatedId).not.toBeNull();
    expect(res.statusCode).toBe(HttpStatus.CREATED);
  });
  test("should respond with a 200 status code when get one last new", async () => {
    const res = await request.get(`${baseUrl}/lastNews/${generatedId}`).send();
    expect(res.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 200 status code when modify an existing last new", async () => {
    lastNewMock.setTitle("Title updated");
    const res = await request
      .patch(`${baseUrl}/lastNews/${generatedId}`)
      .set(commonHeaders)
      .send(lastNewMock);
    expect(res.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 200 status code when get all last news", async () => {
    const res = await request.get(`${baseUrl}/lastNews`).send();
    expect(res.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 204 status code when delete an existing last new", async () => {
    const res = await request
      .delete(`${baseUrl}/lastNews/${generatedId}`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.NO_CONTENT);
  });
  test("should respond with a 404 status code when try to get all last news but them don't exists", async () => {
    const res = await request.get(`${baseUrl}/lastNews`).send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
