import { VideoRequest } from "../../../../external-libraries/openapi";

export interface VideoRepositoryPort {
  save(videoRequest: VideoRequest): Promise<void>;
}
