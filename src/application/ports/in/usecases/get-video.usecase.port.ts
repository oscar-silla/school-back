import { VideoResponse } from "../../../../../external-libraries/openapi/models/VideoResponse";

export interface GetVideoUseCasePort {
  getVideo(id: String): Promise<VideoResponse>;
}
