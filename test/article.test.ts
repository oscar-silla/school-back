import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { baseUrl } from "../src/application/constants";
import { HttpCode } from "../src/application/domain/http-code";
import { Article } from "../src/application/domain/article";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);

let generatedId: string;
const fakeId = "63b04cf26cff5203de1659ca";
const articleMock: Article = new Article(
  "article title",
  "article description",
  "article.png",
  "<h1>article</h1>"
);
const emptyArticleMock: Article = new Article();

const commonHeaders = {
  authorization: process.env.TOKEN,
};

describe("article tests", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });
  afterAll(async () => {
    await mongo.closeConnection();
    httpServer.close();
  });
  test("should respond with a 401 status code when try to create article with invalid auth in request headers", async () => {
    const res = await request.post(`${baseUrl}/articles`).send(articleMock);
    expect(res.statusCode).toBe(HttpCode.UNAUTHORIZED);
  });
  test("should respond with a 401 status code when try to modify article with invalid auth in request headers", async () => {
    const res = await request
      .patch(`${baseUrl}/articles/${articleMock.getId()}`)
      .send(articleMock);
    expect(res.statusCode).toBe(HttpCode.UNAUTHORIZED);
  });
  test("sould respond with a 401 status code when try to delete article with invalid auth in request headers", async () => {
    const res = await request
      .delete(`${baseUrl}/articles/${articleMock.getId()}`)
      .send();
    expect(res.statusCode).toBe(HttpCode.UNAUTHORIZED);
  });
  test("should respond with a 400 status code when try to modify article with wrong id", async () => {
    const res = await request
      .patch(`${baseUrl}/articles/1234`)
      .set(commonHeaders)
      .send(articleMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to delete article with wrong id", async () => {
    const res = await request
      .delete(`${baseUrl}/articles/1234`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to modify article without body params", async () => {
    const res = await request
      .patch(`${baseUrl}/articles/${fakeId}`)
      .set(commonHeaders)
      .send(emptyArticleMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 404 status code when try to get one nonexistent article", async () => {
    const res = await request.get(`${baseUrl}/articles/${fakeId}`).send();
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test("should respond with 400 status code when tr to get one article with wrong id", async () => {
    const res = await request.get(`${baseUrl}/articles/1234`).send();
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to create new article with null title", async () => {
    articleMock.setTitle("");
    const res = await request
      .post(`${baseUrl}/articles`)
      .set(commonHeaders)
      .send(articleMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    articleMock.setTitle("article title");
  });
  test("should respond with a 400 status code when try to create new article with null content", async () => {
    articleMock.setContent("");
    const res = await request
      .post(`${baseUrl}/articles`)
      .set(commonHeaders)
      .send(articleMock);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    articleMock.setContent("<h1>article</h1>");
  });
  test("should respond with a 201 status code when create a new article", async () => {
    const res = await request
      .post(`${baseUrl}/articles`)
      .set(commonHeaders)
      .send(articleMock);
    generatedId = res?.body?.generatedId;
    expect(generatedId).not.toBeNull();
    expect(res.statusCode).toBe(HttpCode.CREATED);
  });
  test("should respond with a 200 status code when get one article", async () => {
    const res = await request.get(`${baseUrl}/articles/${generatedId}`).send();
    expect(res.statusCode).toBe(HttpCode.OK);
  });
  test("should respond with a 200 status code when modify an existing article", async () => {
    articleMock.setTitle("Title updated");
    const res = await request
      .patch(`${baseUrl}/articles/${generatedId}`)
      .set(commonHeaders)
      .send(articleMock);
    expect(res.statusCode).toBe(HttpCode.OK);
  });
  test("should respond with a 200 status code when get all articles", async () => {
    const res = await request.get(`${baseUrl}/articles`).send();
    expect(res.statusCode).toBe(HttpCode.OK);
  });
  test("should respond with a 204 status code when delete an existing article", async () => {
    const res = await request
      .delete(`${baseUrl}/articles/${generatedId}`)
      .set(commonHeaders)
      .send();
    expect(res.statusCode).toBe(HttpCode.NO_CONTENT);
  });
  test("should respond with a 404 status code when try to get all articles but them don't exists", async () => {
    const res = await request.get(`${baseUrl}/articles`).send();
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });
});
