import { GeneratedId } from "../../domain/generated-id";
import { HttpStatus } from "../../domain/http-status";
import { Video } from "../../domain/video";
import { CustomError } from "../../exceptions/CustomError";
import { CreateVideoUseCasePort } from "../../ports/in/usecases/video/create-video.usecase.port";
import { VideoService } from "../../services/video.service";

const videoService = new VideoService();

export class CreateVideoUseCase implements CreateVideoUseCasePort {
  checkBodyParams(video: Video) {
    if (!video.getRef() || !video.getSrc()) {
      throw new CustomError(
        "Missing request body params.",
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async createVideo(video: Video): Promise<GeneratedId> {
    this.checkBodyParams(video);
    return await videoService.createVideo(video);
  }
}
