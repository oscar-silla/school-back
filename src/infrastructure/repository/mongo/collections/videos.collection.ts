import { videosCollection } from "../../../../application/constants";
import { VideoModel } from "../models/video.model";
import { GeneratedIdModel } from "../models/generated-id.model";
import { VideoModelMapper } from "../mappers/video.model.mapper";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { VideosCollectionPort } from "../../../../application/ports/out/collection/videos.collection.port";

export class VideosCollection implements VideosCollectionPort {
  private videoModelMapper: VideoModelMapper = new VideoModelMapper();
  private generatedIdModelMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();

  async save(video: VideoModel): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return this.generatedIdModelMapper.toGenerateIdModel(
      await mongo.collection(videosCollection).insertOne(video)
    );
  }

  async getOneByRef(ref: string): Promise<VideoModel | null> {
    const { mongo } = global.database;
    return this.videoModelMapper.toVideoModel(
      await mongo.collection(videosCollection).findOne({ ref })
    );
  }

  async getOneById(id: string): Promise<VideoModel | null> {
    const { ObjectId, mongo } = global.database;
    return this.videoModelMapper.toVideoModel(
      await mongo.collection(videosCollection).findOne({ _id: ObjectId(id) })
    );
  }

  async modify(id: string, videoModel: VideoModel): Promise<void> {
    const src = videoModel.getSrc();
    const { ObjectId, mongo } = global.database;
    await mongo
      .collection("videos")
      .updateOne({ _id: ObjectId(id) }, { $set: { src } });
  }

  async deleteOneById(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo.collection("videos").deleteOne({ _id: ObjectId(id) });
  }
}
