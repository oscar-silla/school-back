import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { Video } from "../../domain/video";
import { CustomError } from "../../exceptions/CustomError";
import { GetVideoUseCasePort } from "../../ports/in/usecases/video/get-video.usecase.port";
import { VideoService } from "../../services/video.service";

export class GetVideoUseCase implements GetVideoUseCasePort {
  videoService = new VideoService();

  checkRequestParams(ref: string): void {
    if (!ref)
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
  }

  async getVideo(id: string): Promise<Video> {
    this.checkRequestParams(id);
    return await this.videoService.getVideo(id);
  }
}
