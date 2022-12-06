import { VideoRequest } from "../../../../../external-libraries/openapi/models/VideoRequest";
import { VideoSourceRequest } from "../../../../../external-libraries/openapi/models/VideoSourceRequest";
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
  async modify(id: string, payload: VideoSourceRequest) {
    const { src } = payload;
    const { ObjectId, mongo } = global.database;
    return await mongo
      .collection("videos")
      .updateOne({ _id: ObjectId(id) }, { $set: { src } });
  }
}
