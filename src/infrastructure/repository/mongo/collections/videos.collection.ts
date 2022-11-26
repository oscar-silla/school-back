import { VideoRequest } from "../../../../../external-libraries/openapi";

export class VideosCollection {
  async save(videoRequest: VideoRequest) {
    return await global.database.mongo
      .collection("videos")
      .insertOne(videoRequest);
  }
}
