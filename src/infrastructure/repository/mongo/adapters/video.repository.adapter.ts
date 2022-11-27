import {
  VideoRequest,
  VideoResponse,
} from "../../../../../external-libraries/openapi";
import { VideoRepositoryPort } from "../../../../application/ports/out/video.repository.port";
import { VideosCollection } from "../collections/videos.collection";

export class VideoRepositoryAdapter implements VideoRepositoryPort {
  private videosCollection = new VideosCollection();

  async save(videoRequest: VideoRequest): Promise<void> {
    await this.videosCollection.save(videoRequest);
  }

  async getOne(id: string): Promise<VideoResponse> {
    return await this.videosCollection.getOne(id);
  }
}
