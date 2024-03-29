import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { agent } from "supertest";
import { HttpStatus } from "../src/application/domain/http-status";
import { Video } from "../src/application/domain/video";
import { createServer } from "../src/boot";
import { mongo } from "../src/infrastructure/database/mongo";

const httpServer = createServer();
const request = agent(httpServer);
const baseUrl = "/api/v1";

const fakeId = "63b04cf26cff5203de1659ca";
const videoMock = new Video("", "home", "video.mp4");
let generatedId: string;

const commonHeaders = {
  authorization: process.env.TOKEN,
};

describe("/video", () => {
  beforeAll(async () => {
    await mongo.createConnection();
  });

  afterAll(async () => {
    await mongo.closeConnection();
    httpServer.close();
  });

  test("should respond with a 404 status code when try get an inexisting video", async () => {
    const response = await request.get(`${baseUrl}/video/${fakeId}`).send();
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 404 status code when try modify an inexisting video", async () => {
    const response = await request
      .patch(`${baseUrl}/video/${fakeId}`)
      .set(commonHeaders)
      .send(videoMock);
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 201 status code when create a new video", async () => {
    const response = await request
      .post(`${baseUrl}/video`)
      .set(commonHeaders)
      .send(videoMock);
    generatedId = response.body.generatedId;
    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });
  test("should respond with a 200 status code when get an existing video", async () => {
    const response = await request
      .get(`${baseUrl}/video/${videoMock.getRef()}`)
      .set(commonHeaders)
      .send();
    expect(response.statusCode).toBe(HttpStatus.OK);
  });
  test("should respond with a 200 status code when modify an existing video", async () => {
    videoMock.setSrc("contact");
    const response = await request
      .patch(`${baseUrl}/video/${generatedId}`)
      .set(commonHeaders)
      .set(commonHeaders)
      .send(videoMock);
    expect(response.statusCode).toBe(HttpStatus.OK);
    videoMock.setSrc("home");
  });
  test("should respond with a 400 status code when try create video without 'src' body param", async () => {
    videoMock.setSrc("");
    const response = await request
      .post(`${baseUrl}/video`)
      .set(commonHeaders)
      .send(videoMock);
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    videoMock.setSrc("video.mp4");
  });
  test("should respond with a 400 status code when try create video without 'ref' body param", async () => {
    videoMock.setRef("");
    const response = await request
      .post(`${baseUrl}/video`)
      .set(commonHeaders)
      .send();
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    videoMock.setRef("home");
  });
  test("should respond with a 400 status code when try modify video without 'src' body param", async () => {
    videoMock.setSrc("");
    const response = await request
      .patch(`${baseUrl}/video/${generatedId}`)
      .set(commonHeaders)
      .send(videoMock);
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 400 status code when try to delete video with wrong id", async () => {
    const response = await request.delete(`${baseUrl}/video/123`).send();
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  test("should respond with a 404 status code when try to delete video that not exists", async () => {
    const response = await request.delete(`${baseUrl}/video/${fakeId}`).send();
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  test("should respond with a 204 status code when delete an existing video", async () => {
    const response = await request
      .delete(`${baseUrl}/video/${generatedId}`)
      .send();
    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });
});
