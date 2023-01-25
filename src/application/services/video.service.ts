import { VideoRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/video.repository.adapter";
import { GeneratedId } from "../domain/generated-id";
import { HttpCode } from "../domain/http-code";
import { HttpMessage } from "../domain/http-message";
import { Video } from "../domain/video";
import { CustomError } from "../exceptions/CustomError";
import { VideoServicePort } from "../ports/in/services/video.service.port";

export class VideoService implements VideoServicePort {
  videoRepositoryAdapter = new VideoRepositoryAdapter();

  async createVideo(video: Video): Promise<GeneratedId> {
    return await this.videoRepositoryAdapter.save(video);
  }

  async modifyVideo(id: string, video: Video): Promise<void> {
    await this.getVideo(id);
    await this.videoRepositoryAdapter.modify(id, video);
  }

  async getVideo(ref: string): Promise<Video> {
    const video: Video = await this.videoRepositoryAdapter.getOne(ref);
    if (!video.getId()) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpCode.NOT_FOUND);
    } else {
      return video;
    }
  }
}
