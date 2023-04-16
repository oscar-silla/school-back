import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { baseUrl } from "../src/application/constants";
import { Event } from "../src/application/domain/event";
import { HttpStatus } from "../src/application/domain/http-status";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

const commonHeaders = {
  authorization: process.env.TOKEN,
};

let generatedId: string = "";
const fakeId: string = "63b04cf26cff5203de1659ca";
const eventMock: Event = new Event(
  "Event title",
  "Event description",
  "Event img",
  "Event content"
);

describe("Event tests", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });
  afterAll(async () => {
    await mongo.closeConnection();
    httpServer.close();
  });
  test("should respond with a 401 status code when try to create Event without token in request headers", async () => {
    const res = await request.post(`${baseUrl}/events`).send(eventMock);
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to modify Event without token in request headers", async () => {
    const res = await request.patch(`${baseUrl}/events/1234`);
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to delete Event without token in request headers", async () => {
    const res = await request.delete(`${baseUrl}/events/1234`).send();
    expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
  test("should respond with a 404 status code when try to get Events that not exists", async () => {
    const res = await request.get(`${baseUrl}/events`).send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 404 status code when try to modify Event that not exists", async () => {
    const res = await request
      .patch(`${baseUrl}/events/${fakeId}`)
      .set(commonHeaders)
      .send(eventMock);
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 400 status code when try to create Event with empty title body param", async () => {
    eventMock.setTitle("");
    const res = await request
      .post(`${baseUrl}/events`)
      .set(commonHeaders)
      .send(eventMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to create Event with empty img body param", async () => {
    eventMock.setTitle("Event title");
    eventMock.setImg("");
    const res = await request
      .post(`${baseUrl}/events`)
      .set(commonHeaders)
      .send(eventMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to create Event with empty description body param", async () => {
    eventMock.setImg("Event img");
    eventMock.setDescription("");
    const res = await request
      .post(`${baseUrl}/events`)
      .set(commonHeaders)
      .send(eventMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 201 status code when create Event", async () => {
    eventMock.setDescription("Event description");
    const res = await request
      .post(`${baseUrl}/events`)
      .set(commonHeaders)
      .send(eventMock);
    generatedId = res?.body?.generatedId;
    expect(res.statusCode).toBe(HttpStatus.CREATED);
  });
  test("should respond with a 409 status code when try to create Event with title that already exists", async () => {
    eventMock.setDescription("Event description");
    const res = await request
      .post(`${baseUrl}/events`)
      .set(commonHeaders)
      .send(eventMock);
    expect(res.statusCode).toBe(HttpStatus.CONFLICT);
  });
  test("should respond with a 400 status code when try to get Event with invalid id param", async () => {
    const res = await request.get(`${baseUrl}/events/1234`).send();
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 404 status code when try to get Event that not exists", async () => {
    const res = await request.get(`${baseUrl}/events/${fakeId}`).send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 200 status code when get an existing Event", async () => {
    const res = await request.get(`${baseUrl}/events/${generatedId}`).send();
    expect(res.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 200 status code when get an existing Events", async () => {
    const res = await request.get(`${baseUrl}/events`).send();
    expect(res.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 400 status code when try to modify Event with invalid id param", async () => {
    const res = await request
      .patch(`${baseUrl}/events/1234`)
      .set(commonHeaders)
      .send(eventMock);
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 200 status code when modify an existing Event", async () => {
    eventMock.setTitle("Modified title");
    const res = await request
      .patch(`${baseUrl}/events/${generatedId}`)
      .set(commonHeaders)
      .send(eventMock);
    expect(res.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 400 status code when try to delete Event with invalid id param", async () => {
    const res = await request
      .delete(`${baseUrl}/events/1234`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 404 status code when try to delete Event that not exists", async () => {
    const res = await request
      .delete(`${baseUrl}/events/${fakeId}`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 204 status code when delete an existing Event", async () => {
    const res = await request
      .delete(`${baseUrl}/events/${generatedId}`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpStatus.NO_CONTENT);
  });
});
