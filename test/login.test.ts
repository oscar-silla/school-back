import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { HttpStatus } from "../src/application/domain/http-status";
import { LoginCredentials } from "../src/application/domain/login-credentials";
import { User } from "../src/application/domain/user";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

const baseUrl = "/api/v1";

const id = "";
const email = "osilla@outlook.com";
const password = "1234";
const wrongPassword = "4567";
const username = "osilla";
const name = "Óscar";
const surnames = "Silla";
const avatar = "avatar.jpg";
const loginCredentialsMock: LoginCredentials = new LoginCredentials(
  email,
  password
);
const userMock: User = new User(
  id,
  username,
  wrongPassword,
  name,
  email,
  surnames,
  avatar
);
const commonHeaders = {
  authorization: process.env.TOKEN,
};

describe("login tests", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });

  afterAll(async () => {
    await mongo.closeConnection();
    httpServer.close();
  });

  test("should respond with 400 status code when try login send null email in body params", async () => {
    loginCredentialsMock.setEmail("");
    const res = await request
      .post(`${baseUrl}/login`)
      .send(loginCredentialsMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
    loginCredentialsMock.setEmail(email);
  });
  test("should respond with 400 status code when try login send null password in body params", async () => {
    loginCredentialsMock.setPassword("");
    const res = await request
      .post(`${baseUrl}/login`)
      .send(loginCredentialsMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
    loginCredentialsMock.setPassword(password);
  });
  test("should respond with 404 status code when try to login with user that not exists", async () => {
    const res = await request
      .post(`${baseUrl}/login`)
      .send(loginCredentialsMock);
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with 401 status code when try to login with an existing user but wrong password", async () => {
    const userResponse = await request.post(`${baseUrl}/users`).send(userMock);
    const { generatedId } = userResponse?.body;
    const res = await request
      .post(`${baseUrl}/login`)
      .send(loginCredentialsMock);
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    await request
      .delete(`${baseUrl}/users/${generatedId}`)
      .set(commonHeaders)
      .send();
  });
  test("should respond with 404 status code when try to generate token without secret key", async () => {
    userMock.setPassword(password);
    const userResponse = await request.post(`${baseUrl}/users`).send(userMock);
    const { generatedId } = userResponse?.body;
    const originalSecret = process.env.SECRET;
    process.env.SECRET = "";
    const res = await request.post(`${baseUrl}/login`).send(userMock);
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
    process.env.SECRET = originalSecret;
    userMock.setPassword(wrongPassword);
    await request
      .delete(`${baseUrl}/users/${generatedId}`)
      .set(commonHeaders)
      .send();
  });
  test("should respond with 200 status code when login is success", async () => {
    userMock.setPassword(password);
    const userResponse = await request.post(`${baseUrl}/users`).send(userMock);
    const { generatedId } = userResponse?.body;
    const res = await request
      .post(`${baseUrl}/login`)
      .send(loginCredentialsMock);
    expect(res.statusCode).toBe(HttpStatus.OK);
    await request
      .delete(`${baseUrl}/users/${generatedId}`)
      .set(commonHeaders)
      .send();
    userMock.setPassword(wrongPassword);
  });
});
