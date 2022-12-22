import { VideoSourceRequest } from "../../../../external-libraries/openapi/models/VideoSourceRequest";
import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { CustomError } from "../../exceptions/CustomError";
import { ModifyVideoUseCasePort } from "../../ports/in/usecases/modify-video.usecase.port";
import { VideoService } from "../../services/video.service";
import { checkObjectId } from "../../utils/check-objectid.util";
const { WRONG_ID_FORMAT, MISSING_PARAMS } = HttpMessage;
const { BAD_REQUEST } = HttpCode;

export class ModifyVideoUseCase implements ModifyVideoUseCasePort {
  private videoService = new VideoService();

  checkRequestParams(id: string, videoSourceRequest: VideoSourceRequest) {
    if (!videoSourceRequest || !videoSourceRequest?.src || !id) {
      throw new CustomError(MISSING_PARAMS, BAD_REQUEST, {});
    }
    if (!checkObjectId(id)) {
      throw new CustomError(WRONG_ID_FORMAT, BAD_REQUEST, {});
    }
  }

  async modifyVideo(id: string, body: VideoSourceRequest): Promise<void> {
    this.checkRequestParams(id, body);
    await this.videoService.modifyVideo(id, body);
  }
}
