import { videosCollection } from "../../../../application/constants";
import { Video } from "../../../../application/domain/video";

export class VideosCollection {
  async save(video: Video) {
    const { mongo } = global.database;
    return await mongo.collection(videosCollection).insertOne(video);
  }
  async getOneByRef(ref: string) {
    const { mongo } = global.database;
    return await mongo.collection(videosCollection).findOne({ ref });
  }
  async getOneById(id: string) {
    const { ObjectId, mongo } = global.database;
    return await mongo
      .collection(videosCollection)
      .findOne({ _id: ObjectId(id) });
  }
  async modify(id: string, payload: Video) {
    const src = payload.getSrc();
    const { ObjectId, mongo } = global.database;
    return await mongo
      .collection("videos")
      .updateOne({ _id: ObjectId(id) }, { $set: { src } });
  }
  async deleteOneById(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo.collection("videos").deleteOne({ _id: ObjectId(id) });
  }
}
