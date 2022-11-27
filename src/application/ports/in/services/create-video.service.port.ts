import { VideoRequest } from "../../../../../external-libraries/openapi";

export interface CreateVideoServicePort {
  createVideo(videoRequest: VideoRequest): Promise<void>;
}
