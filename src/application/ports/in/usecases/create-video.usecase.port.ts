import { VideoRequest } from "../../../../../external-libraries/openapi";

export interface CreateVideoUseCasePort {
  createVideo(body: VideoRequest): Promise<void>;
}
