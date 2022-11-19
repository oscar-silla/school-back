import { VideoType } from "../../../../external-libraries/openapi";
import { CreateVideoUseCasePort } from "../../ports/in/usecases/create-video-usecase-port";
import { VideoService } from "../../services/video-service";

const videoService = new VideoService();

export class CreateVideoUseCase implements CreateVideoUseCasePort {
  createVideo(): VideoType {
    return videoService.createVideo();
  }
}
