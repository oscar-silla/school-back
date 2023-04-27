import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { HttpStatus } from "../src/application/domain/http-status";
import { LoginCredentials } from "../src/application/domain/login-credentials";
import { User } from "../src/application/domain/user";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

const baseUrl: string = "/api/v1";

const id: string = "";
const email: string = "osilla@outlook.com";
const password: string = "1234";
const wrongPassword: string = "4567";
const username: string = "osilla";
const name: string = "Óscar";
const surnames: string = "Silla";
const avatar: string = "avatar.jpg";
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

describe("login tests", (): void => {
  beforeAll(async (): Promise<void> => {
    await mongo.createConnection();
  });

  afterAll(async (): Promise<void> => {
    await mongo.closeConnection();
    httpServer.close();
  });

  test("should respond with 400 status code when try login send null email in body params", async (): Promise<void> => {
    loginCredentialsMock.setEmail("");
    const res = await request
      .post(`${baseUrl}/login`)
      .send(loginCredentialsMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
    loginCredentialsMock.setEmail(email);
  });
  test("should respond with 400 status code when try login send null password in body params", async (): Promise<void> => {
    loginCredentialsMock.setPassword("");
    const res = await request
      .post(`${baseUrl}/login`)
      .send(loginCredentialsMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
    loginCredentialsMock.setPassword(password);
  });
  test("should respond with 404 status code when try to login with user that not exists", async (): Promise<void> => {
    const res = await request
      .post(`${baseUrl}/login`)
      .send(loginCredentialsMock);
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with 401 status code when try to login with an existing user but wrong password", async (): Promise<void> => {
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
  test("should respond with 404 status code when try to generate token without secret key", async (): Promise<void> => {
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
  test("should respond with 200 status code when login is success", async (): Promise<void> => {
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
