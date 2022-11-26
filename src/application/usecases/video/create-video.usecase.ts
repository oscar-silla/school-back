import { VideoRequest } from "../../../../external-libraries/openapi";
import { Video } from "../../domain/video";
import { CreateVideoUseCasePort } from "../../ports/in/usecases/create-video.usecase.port";
import { VideoService } from "../../services/video.service";

const videoService = new VideoService();

export class CreateVideoUseCase implements CreateVideoUseCasePort {
  createVideo(videoRequestParams: VideoRequest): Promise<Video> {
    return videoService.createVideo(videoRequestParams);
  }
}
