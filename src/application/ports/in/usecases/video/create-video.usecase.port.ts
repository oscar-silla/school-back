import { VideoRequest } from "../../../../../../external-libraries/openapi/models/VideoRequest";

export interface CreateVideoUseCasePort {
  createVideo(body: VideoRequest): Promise<void>;
}
