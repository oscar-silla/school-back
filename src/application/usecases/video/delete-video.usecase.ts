import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { CustomError } from "../../exceptions/CustomError";
import { VideoServicePort } from "../../ports/in/services/video.service.port";
import { DeleteVideoUseCasePort } from "../../ports/in/usecases/video/delete-video.usecase.port";
import { VideoService } from "../../services/video.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class DeleteVideoUseCase implements DeleteVideoUseCasePort {
  private videoService: VideoServicePort = new VideoService();

  private checkPathParams(id: string): void {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async deleteVideo(id: string): Promise<void> {
    this.checkPathParams(id);
    await this.videoService.deleteVideo(id);
  }
}
