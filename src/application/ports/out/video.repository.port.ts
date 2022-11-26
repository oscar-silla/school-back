import { VideoRequest } from "../../../../external-libraries/openapi";
import { Video } from "../../domain/video";

export interface VideoRepositoryPort {
  save(videoRequest: VideoRequest): Promise<Video>;
}
