import { VideoRequest } from "../../../external-libraries/openapi";
import { VideoRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/video.repository.adapter";
import { CreateVideoServicePort } from "../ports/in/services/create-video.service.port";

export class VideoService implements CreateVideoServicePort {
  videoRepositoryAdapter = new VideoRepositoryAdapter();

  async createVideo(videoRequest: VideoRequest): Promise<void> {
    return await this.videoRepositoryAdapter.save(videoRequest);
  }
}
