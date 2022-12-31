import { HttpCode } from "../../domain/http-code";
import { Video } from "../../domain/video";
import { CustomError } from "../../exceptions/CustomError";
import { CreateVideoUseCasePort } from "../../ports/in/usecases/video/create-video.usecase.port";
import { VideoService } from "../../services/video.service";

const videoService = new VideoService();

export class CreateVideoUseCase implements CreateVideoUseCasePort {
  checkBodyParams(video: Video) {
    if (!video.getRef || !video.getSrc) {
      throw new CustomError(
        "Missing request body params.",
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }

  async createVideo(video: Video): Promise<void> {
    this.checkBodyParams(video);
    return await videoService.createVideo(video);
  }
}
