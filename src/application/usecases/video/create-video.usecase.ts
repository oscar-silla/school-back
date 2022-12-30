import { VideoRequest } from "../../../../external-libraries/openapi/models/VideoRequest";
import { CustomError } from "../../exceptions/CustomError";
import { CreateVideoUseCasePort } from "../../ports/in/usecases/video/create-video.usecase.port";
import { VideoService } from "../../services/video.service";

const videoService = new VideoService();

export class CreateVideoUseCase implements CreateVideoUseCasePort {
  checkRequestBody(videoRequest: VideoRequest) {
    const { ref, src } = videoRequest;
    if (!ref || !src) {
      throw new CustomError("Missing request body params.", 400, {});
    }
  }

  async createVideo(videoRequestParams: VideoRequest): Promise<void> {
    this.checkRequestBody(videoRequestParams);
    return await videoService.createVideo(videoRequestParams);
  }
}
