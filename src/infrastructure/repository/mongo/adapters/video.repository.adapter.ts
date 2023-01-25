import { GeneratedId } from "../../../../application/domain/generated-id";
import { Video } from "../../../../application/domain/video";
import { VideoRepositoryPort } from "../../../../application/ports/out/video.repository.port";
import { VideosCollection } from "../collections/videos.collection";
import { GeneratedIdMapperModel } from "../mappers/generated-id.mapper.model";
import { VideoMapperModel } from "../mappers/video.mapper.model";
import { VideoModel } from "../models/video.model";

export class VideoRepositoryAdapter implements VideoRepositoryPort {
  private videosCollection = new VideosCollection();
  private videoMapperModel = new VideoMapperModel();
  private generatedIdMapperModel = new GeneratedIdMapperModel();

  async save(videoRequest: Video): Promise<GeneratedId> {
    const response = await this.videosCollection.save(videoRequest);
    return this.generatedIdMapperModel.toGeneratedId(response);
  }

  async getOne(ref: string): Promise<Video> {
    const response: VideoModel = await this.videosCollection.getOne(ref);
    return this.videoMapperModel.toVideo(response);
  }

  async modify(id: string, payload: Video): Promise<void> {
    await this.videosCollection.modify(id, payload);
  }
}
