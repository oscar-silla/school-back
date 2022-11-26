import { VideoRequest } from "../../../../../external-libraries/openapi";
import { Video } from "../../../domain/video";

export interface CreateVideoServicePort {
  createVideo(videoRequest: VideoRequest): Promise<Video>;
}
