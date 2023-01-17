import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { HttpCode } from "../../../../../src/application/domain/http-code";
import { User } from "../../../../../src/application/domain/user";
import { checkObjectId } from "../../../../../src/application/utils/check-objectid.util";
import { createServer } from "../../../../../src/boot";
import { mongo } from "../../../../../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);
const baseUrl = "/api/v1";
let idMock: string = "";

const userMock = new User(
  "",
  "osilla",
  "1234",
  "oscar",
  "osilla@outlook.com",
  "silla",
  "avatar"
);

describe("User tests", () => {
  beforeAll(() => {
    mongo.createConnection();
  });
  afterAll(() => {
    httpServer.close();
    mongo.closeConnection();
  });
  test("should respond with a 404 status code when try to get all users but they don't exists", async () => {
    const res = await request.get(`${baseUrl}/users`).send();
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test("should respond with 400 status code when try to get user without send id to find it", async () => {
    const res = await request
      .get(`${baseUrl}/users/${userMock.getId()}`)
      .send();
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with 404 status code when try to get a user wich not exists", async () => {
    userMock.setId("63c5a6831e617bddc06f590d");
    const res = await request
      .get(`${baseUrl}/users/${userMock.getId()}`)
      .send();
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test("should respond with 400 status code when try to create user send null param username in body", async () => {
    userMock.setId("");
    userMock.setUsername("");
    const res = await request.post(`${baseUrl}/users`).send(userMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with 400 status code when try to create user send null param password in body", async () => {
    userMock.setId("");
    userMock.setUsername("osilla");
    userMock.setPassword("");
    const res = await request.post(`${baseUrl}/users`).send(userMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with 400 status code when try to create user send null param name in body", async () => {
    userMock.setId("");
    userMock.setPassword("1234");
    userMock.setName("");
    const res = await request.post(`${baseUrl}/users`).send(userMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with 400 status code when try to create user send null param email in body", async () => {
    userMock.setId("");
    userMock.setName("oscar");
    userMock.setEmail("");
    const res = await request.post(`${baseUrl}/users`).send(userMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 201 status code and return a valid generated id when create a new user", async () => {
    userMock.setEmail("osilla@outlook.com");
    const res = await request.post(`${baseUrl}/users`).send(userMock);
    const { generatedId } = res.body ?? "";
    const verifiedId = checkObjectId(generatedId);
    expect(generatedId).not.toBeNull();
    expect(verifiedId).toBe(true);
    expect(res.statusCode).toBe(HttpCode.CREATED);
    idMock = generatedId;
  });
  test("should respond with a 409 status code when try to create an existing user", async () => {
    const res = await request.post(`${baseUrl}/users`).send(userMock);
    expect(res.statusCode).toBe(HttpCode.CONFLICT);
  });
  test("should respond with a 400 status code when try to delete user send null param id in body", async () => {
    userMock.setId("badid");
    const res = await request
      .delete(`${baseUrl}/users/${userMock.getId()}`)
      .send();
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 404 status code when try to delete user wich not exists", async () => {
    userMock.setId("63c5a85ad206872cf41df870");
    const res = await request
      .delete(`${baseUrl}/users/${userMock.getId()}`)
      .send();
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test("should respond with a 204 status code when delete an existing user", async () => {
    const res = await request.delete(`${baseUrl}/users/${idMock}`).send();
    expect(res.statusCode).toBe(HttpCode.NO_CONTENT);
  });
});
