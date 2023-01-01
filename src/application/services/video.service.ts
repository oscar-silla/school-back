import { VideoRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/video.repository.adapter";
import { Video } from "../domain/video";
import { CustomError } from "../exceptions/CustomError";
import { VideoServicePort } from "../ports/in/services/video.service.port";

export class VideoService implements VideoServicePort {
  videoRepositoryAdapter = new VideoRepositoryAdapter();

  async createVideo(video: Video): Promise<void> {
    return await this.videoRepositoryAdapter.save(video);
  }

  async modifyVideo(id: string, video: Video): Promise<void> {
    await this.getVideo(id);
    await this.videoRepositoryAdapter.modify(id, video);
  }

  async getVideo(id: string): Promise<Video> {
    const video: Video = await this.videoRepositoryAdapter.getOne(id);
    if (!video.getId()) {
      throw new CustomError(`Video with id = "${id}" not found.`, 404);
    } else {
      return video;
    }
  }
}
