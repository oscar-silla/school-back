import { VideoRequest } from "../../../../../external-libraries/openapi";
import { videosCollection } from "../../../../application/constants";

export class VideosCollection {
  async save(videoRequest: VideoRequest) {
    const { mongo } = global.database;
    return await mongo.collection(videosCollection).insertOne(videoRequest);
  }
  async getOne(id: string) {
    const { ObjectId, mongo } = global.database;
    return await mongo
      .collection(videosCollection)
      .findOne({ _id: ObjectId(id) });
  }
}
