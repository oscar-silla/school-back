import { VideoRequest } from "../../../../../external-libraries/openapi";
import { Video } from "../../../domain/video";

export interface CreateVideoUseCasePort {
  createVideo(body: VideoRequest): Promise<Video>;
}
