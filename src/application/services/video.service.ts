import { VideoRequest } from "../../../external-libraries/openapi";
import { VideoRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/video.repository.adapter";
import { Video } from "../domain/video";
import { CustomError } from "../exceptions/CustomError";
import { CreateVideoServicePort } from "../ports/in/services/create-video.service.port";

export class VideoService implements CreateVideoServicePort {
  videoRepositoryAdapter = new VideoRepositoryAdapter();

  checkVideoRequest(videoRequest: VideoRequest) {
    const { ref, src } = videoRequest;
    if (!ref || !src) {
      throw new CustomError("Missing request body params.", 400, {});
    }
  }
  async createVideo(videoRequest: VideoRequest): Promise<Video> {
    this.checkVideoRequest(videoRequest);
    return await this.videoRepositoryAdapter.save(videoRequest);
  }
}
