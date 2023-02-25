import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { Video } from "../../domain/video";
import { CustomError } from "../../exceptions/CustomError";
import { ModifyVideoUseCasePort } from "../../ports/in/usecases/video/modify-video.usecase.port";
import { VideoService } from "../../services/video.service";
import { checkObjectId } from "../../utils/check-objectid.util";

const { WRONG_ID_FORMAT, MISSING_PARAMS } = HttpMessage;
const { BAD_REQUEST } = HttpStatus;

export class ModifyVideoUseCase implements ModifyVideoUseCasePort {
  private videoService = new VideoService();

  private checkBodyParams(video: Video) {
    if (!video.getSrc()) {
      throw new CustomError(MISSING_PARAMS, BAD_REQUEST, {});
    }
  }

  private checkPathParams(id: string) {
    if (!id) {
      throw new CustomError(MISSING_PARAMS, BAD_REQUEST, {});
    }
    if (!checkObjectId(id)) {
      throw new CustomError(WRONG_ID_FORMAT, BAD_REQUEST, {});
    }
  }

  private checkParams(id: string, video: Video) {
    this.checkPathParams(id);
    this.checkBodyParams(video);
  }

  async modifyVideo(id: string, video: Video): Promise<void> {
    this.checkParams(id, video);
    await this.videoService.modifyVideo(id, video);
  }
}
