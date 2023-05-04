import { GeneratedId } from "../../../../application/domain/generated-id";
import { Video } from "../../../../application/domain/video";
import { VideoRepositoryPort } from "../../../../application/ports/out/repository/video.repository.port";
import { VideosCollection } from "../collections/videos.collection";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { VideoModelMapper } from "../mappers/video.model.mapper";
import { VideoModel } from "../models/video.model";
import { GeneratedIdModel } from "../models/generated-id.model";

export class VideoRepositoryAdapter implements VideoRepositoryPort {
  private videosCollection = new VideosCollection();
  private videoModelMapper: VideoModelMapper = new VideoModelMapper();
  private generatedIdModelMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();

  async save(video: Video): Promise<GeneratedId> {
    const videoModel: VideoModel = this.videoModelMapper.toVideoModel(video)!;
    const response: GeneratedIdModel = await this.videosCollection.save(
      videoModel
    );
    return this.generatedIdModelMapper.toGeneratedId(response);
  }

  async getOneByRef(ref: string): Promise<Video | null> {
    const response: VideoModel | null = await this.videosCollection.getOneByRef(
      ref
    );
    return this.videoModelMapper.toVideo(response);
  }

  async getOneById(id: string): Promise<Video | null> {
    const response: VideoModel | null = await this.videosCollection.getOneById(
      id
    );
    return this.videoModelMapper.toVideo(response);
  }

  async modify(id: string, video: Video): Promise<void> {
    const videoModel: VideoModel = this.videoModelMapper.toVideoModel(video)!;
    await this.videosCollection.modify(id, videoModel);
  }

  async deleteOne(id: string): Promise<void> {
    await this.videosCollection.deleteOneById(id);
  }
}
