import {
  VideoRequest,
  VideoResponse,
  VideoSourceRequest,
} from "../../../external-libraries/openapi";
import { VideoRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/video.repository.adapter";
import { CustomError } from "../exceptions/CustomError";
import { VideoServicePort } from "../ports/in/services/video.service.port";

export class VideoService implements VideoServicePort {
  videoRepositoryAdapter = new VideoRepositoryAdapter();

  async createVideo(videoRequest: VideoRequest): Promise<void> {
    return await this.videoRepositoryAdapter.save(videoRequest);
  }

  async modifyVideo(
    id: string,
    requestBody: VideoSourceRequest
  ): Promise<void> {
    await this.getVideo(id);
    await this.videoRepositoryAdapter.modify(id, requestBody);
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
