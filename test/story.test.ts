import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { baseUrl } from "../src/application/constants";
import { HttpCode } from "../src/application/domain/http-code";
import { Story } from "../src/application/domain/story";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

let generatedId: string;
const fakeId = "63b04cf26cff5203de1659ca";
const storyMock: Story = new Story(
  "Story title",
  "Story description",
  "story.png",
  "<h1>Story</h1>"
);
const emptyStoryMock: Story = new Story();

describe("Story tests", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });
  afterAll(async () => {
    await mongo.closeConnection();
    httpServer.close();
  });
  test("should respond with a 400 status code when try to modify story with wrong id", async () => {
    const res = await request.patch(`${baseUrl}/stories/1234`).send(storyMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to delete story with wrong id", async () => {
    const res = await request.delete(`${baseUrl}/stories/1234`).send();
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to modify story without body params", async () => {
    const res = await request
      .patch(`${baseUrl}/stories/${fakeId}`)
      .send(emptyStoryMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 404 status code when try to get one nonexistent story", async () => {
    const res = await request.get(`${baseUrl}/stories/${fakeId}`).send();
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test("should respond with 400 status code when tr to get one story with wrong id", async () => {
    const res = await request.get(`${baseUrl}/stories/1234`).send();
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to create new story with null title", async () => {
    storyMock.setTitle("");
    const res = await request.post(`${baseUrl}/stories`).send(storyMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    storyMock.setTitle("Story title");
  });
  test("should respond with a 400 status code when try to create new story with null content", async () => {
    storyMock.setContent("");
    const res = await request.post(`${baseUrl}/stories`).send(storyMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    storyMock.setContent("<h1>Story</h1>");
  });
  test("should respond with a 201 status code when create a new story", async () => {
    const res = await request.post(`${baseUrl}/stories`).send(storyMock);
    generatedId = res?.body?.generatedId;
    expect(generatedId).not.toBeNull();
    expect(res.statusCode).toBe(HttpCode.CREATED);
  });
  test("should respond with a 200 status code when get one story", async () => {
    const res = await request.get(`${baseUrl}/stories/${generatedId}`).send();
    expect(res.statusCode).toBe(HttpCode.OK);
  });
  test("should respond with a 200 status code when modify an existing story", async () => {
    storyMock.setTitle("Title updated");
    const res = await request
      .patch(`${baseUrl}/stories/${generatedId}`)
      .send(storyMock);
    expect(res.statusCode).toBe(HttpCode.OK);
  });
  test("should respond with a 200 status code when get all stories", async () => {
    const res = await request.get(`${baseUrl}/stories`).send();
    expect(res.statusCode).toBe(HttpCode.OK);
  });
  test("should respond with a 204 status code when delete an existing story", async () => {
    const res = await request
      .delete(`${baseUrl}/stories/${generatedId}`)
      .send();
    expect(res.statusCode).toBe(HttpCode.NO_CONTENT);
  });
  test("should respond with a 404 status code when try to get all stories but them don't exists", async () => {
    const res = await request.get(`${baseUrl}/stories`).send();
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });
});
