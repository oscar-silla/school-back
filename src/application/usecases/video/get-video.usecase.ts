import { Video } from "../../domain/video";
import { CustomError } from "../../exceptions/CustomError";
import { GetVideoUseCasePort } from "../../ports/in/usecases/video/get-video.usecase.port";
import { VideoService } from "../../services/video.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class GetVideoUseCase implements GetVideoUseCasePort {
  videoService = new VideoService();

  checkRequestParams(id: string): void {
    if (!id) throw new CustomError("Missing request params.", 400);
    if (!checkObjectId(id))
      throw new CustomError("Provided id has not valid format.", 400);
  }

  async getVideo(id: string): Promise<Video> {
    this.checkRequestParams(id);
    return await this.videoService.getVideo(id);
  }
}
