import { VideoRequest } from "../../../../../external-libraries/openapi";
import { VideoRepositoryPort } from "../../../../application/ports/out/video.repository.port";
import { VideosCollection } from "../collections/videos.collection";

export class VideoRepositoryAdapter implements VideoRepositoryPort {
  private videosCollection = new VideosCollection();

  async save(videoRequest: VideoRequest): Promise<void> {
    await this.videosCollection.save(videoRequest);
  }
}
