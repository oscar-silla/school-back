import { GeneratedId } from "../../../../application/domain/generated-id";
import { Video } from "../../../../application/domain/video";
import { VideoRepositoryPort } from "../../../../application/ports/out/video.repository.port";
import { VideosCollection } from "../collections/videos.collection";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { VideoModelMapper } from "../mappers/video.model.mapper";
import { VideoModel } from "../models/video.model";

export class VideoRepositoryAdapter implements VideoRepositoryPort {
  private videosCollection = new VideosCollection();
  private videoModelMapper = new VideoModelMapper();
  private generatedIdModelMapper = new GeneratedIdModelMapper();

  async save(video: Video): Promise<GeneratedId> {
    const videoModel: VideoModel = this.videoModelMapper.toVideoModel(video);
    const response = await this.videosCollection.save(videoModel);
    return this.generatedIdModelMapper.toGeneratedId(response);
  }

  async getOneByRef(ref: string): Promise<Video> {
    const response: VideoModel = await this.videosCollection.getOneByRef(ref);
    return this.videoModelMapper.toVideo(response);
  }

  async getOneById(id: string): Promise<Video> {
    const response: VideoModel = await this.videosCollection.getOneById(id);
    return this.videoModelMapper.toVideo(response);
  }

  async modify(id: string, video: Video): Promise<void> {
    const videoModel: VideoModel = this.videoModelMapper.toVideoModel(video);
    await this.videosCollection.modify(id, videoModel);
  }

  async deleteOne(id: string): Promise<void> {
    await this.videosCollection.deleteOneById(id);
  }
}
