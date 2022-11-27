import {
  VideoRequest,
  VideoResponse,
} from "../../../external-libraries/openapi";
import { VideoRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/video.repository.adapter";
import { CustomError } from "../exceptions/CustomError";
import { CreateVideoServicePort } from "../ports/in/services/create-video.service.port";

export class VideoService implements CreateVideoServicePort {
  videoRepositoryAdapter = new VideoRepositoryAdapter();

  async createVideo(videoRequest: VideoRequest): Promise<void> {
    return await this.videoRepositoryAdapter.save(videoRequest);
  }

  async getVideo(id: string): Promise<VideoResponse> {
    const video: VideoResponse = await this.videoRepositoryAdapter.getOne(id);
    if (!video) {
      throw new CustomError(`Video with id = "${id}" not found.`, 404);
    } else {
      return video;
    }
  }
}
