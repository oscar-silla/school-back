import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { baseUrl } from "../src/application/constants";
import { HttpStatus } from "../src/application/domain/http-status";
import { Section } from "../src/application/domain/section";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

const sectionMock = new Section("", "Home", "Home description", "home.jpg", "");
const sectionMock_2 = new Section(
  "",
  "Account",
  "Account description",
  "account.jpg",
  "account"
);
const fakeRef = "fake";

const commonHeaders = {
  authorization: process.env.TOKEN,
};

describe("/sections", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });

  afterAll(async () => {
    await mongo.closeConnection();
    httpServer.close();
  });
  test("should respond with a 401 status code when try to create section with invalid auth in request headers", async () => {
    const res = await request.post(`${baseUrl}/sections`).send(sectionMock);
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to modify section with invalid auth in request headers", async () => {
    const res = await request
      .patch(`${baseUrl}/sections/${fakeRef}`)
      .send(sectionMock);
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to delete section with invalid auth in request headers", async () => {
    const res = await request.delete(`${baseUrl}/sections/${fakeRef}`).send();
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 404 status code when not found sections", async () => {
    const res = await request.get(`${baseUrl}/sections`).send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 404 status code when not found specific section", async () => {
    const res = await request.get(`${baseUrl}/sections/home`).send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 404 status code when try to modify an inexisting section", async () => {
    sectionMock.setImg("nosection.jpg");
    const res = await request
      .patch(`${baseUrl}/sections/nosection`)
      .set(commonHeaders)
      .send(sectionMock);
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
    sectionMock.setImg("home.jpg");
  });
  test("should respond with a 201 status code when create a new section", async () => {
    const res = await request
      .post(`${baseUrl}/sections`)
      .set(commonHeaders)
      .send(sectionMock);
    expect(res.statusCode).toBe(HttpStatus.CREATED);
  });
  test("should respond with a 409 status code when try create section with an existing ref", async () => {
    const res = await request
      .post(`${baseUrl}/sections`)
      .set(commonHeaders)
      .send(sectionMock);
    expect(res.statusCode).toBe(HttpStatus.CONFLICT);
  });
  test("should respond with a 200 status code when modify an existing section", async () => {
    sectionMock.setImg("anotherImage.jpg");
    const res = await request
      .patch(`${baseUrl}/sections/home`)
      .set(commonHeaders)
      .send(sectionMock);
    expect(res.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 409 status code when try to modify section ref and set an existing ref from another section", async () => {
    const resCreation = await request
      .post(`${baseUrl}/sections`)
      .set(commonHeaders)
      .send(sectionMock_2);
    expect(resCreation.statusCode).toBe(HttpStatus.CREATED);
    const resModify = await request
      .patch(`${baseUrl}/sections/home`)
      .set(commonHeaders)
      .send(sectionMock_2);
    expect(resModify.statusCode).toBe(HttpStatus.CONFLICT);
    const resDelete = await request
      .delete(`${baseUrl}/sections/account`)
      .set(commonHeaders)
      .send();
    expect(resDelete.statusCode).toBe(HttpStatus.NO_CONTENT);
  });
  test("should respond with a 200 status code when find existing sections", async () => {
    const res = await request.get(`${baseUrl}/sections`).send();
    expect(res.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 200 status code when find an existing section", async () => {
    const res = await request.get(`${baseUrl}/sections/home`).send();
    expect(res.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 404 status code when try to delete an inexisting section", async () => {
    const res = await request
      .delete(`${baseUrl}/sections/nosection`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 204 status code with delete an existing section", async () => {
    const res = await request
      .delete(`${baseUrl}/sections/home`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.NO_CONTENT);
  });
});
