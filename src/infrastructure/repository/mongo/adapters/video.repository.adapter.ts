import { Video } from "../../../../application/domain/video";
import { VideoRepositoryPort } from "../../../../application/ports/out/video.repository.port";
import { VideosCollection } from "../collections/videos.collection";
import { VideoMapperModel } from "../mappers/video.mapper.model";

export class VideoRepositoryAdapter implements VideoRepositoryPort {
  private videosCollection = new VideosCollection();
  private videoMapperModel = new VideoMapperModel();

  async save(videoRequest: Video): Promise<void> {
    await this.videosCollection.save(videoRequest);
  }

  async getOne(id: string): Promise<Video> {
    const response = await this.videosCollection.getOne(id);
    return this.videoMapperModel.toVideo(response);
  }

  async modify(id: string, payload: Video): Promise<void> {
    await this.videosCollection.modify(id, payload);
  }
}
