import { GeneratedId } from "../../../../application/domain/generated-id";
import { Video } from "../../../../application/domain/video";
import { VideoRepositoryPort } from "../../../../application/ports/out/video.repository.port";
import { VideosCollection } from "../collections/videos.collection";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { VideoMapperModel } from "../mappers/video.model.mapper";
import { VideoDao } from "../models/video.dao";

export class VideoRepositoryAdapter implements VideoRepositoryPort {
  private videosCollection = new VideosCollection();
  private videoModelMapper = new VideoMapperModel();
  private generatedIdModelMapper = new GeneratedIdModelMapper();

  async save(videoRequest: Video): Promise<GeneratedId> {
    const response = await this.videosCollection.save(videoRequest);
    return this.generatedIdModelMapper.toGeneratedId(response);
  }

  async getOneByRef(ref: string): Promise<Video> {
    const response: VideoDao = await this.videosCollection.getOneByRef(ref);
    return this.videoModelMapper.toVideo(response);
  }

  async getOneById(id: string): Promise<Video> {
    const response: VideoDao = await this.videosCollection.getOneById(id);
    return this.videoModelMapper.toVideo(response);
  }

  async modify(id: string, payload: Video): Promise<void> {
    await this.videosCollection.modify(id, payload);
  }

  async deleteOne(id: string): Promise<void> {
    await this.videosCollection.deleteOneById(id);
  }
}
