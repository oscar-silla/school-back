import { VideoResponse } from "../../../../../external-libraries/openapi";

export interface GetVideoUseCasePort {
  getVideo(id: String): Promise<VideoResponse>;
}
