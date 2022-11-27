import {
  VideoRequest,
  VideoResponse,
} from "../../../../../external-libraries/openapi";

export interface CreateVideoServicePort {
  createVideo(videoRequest: VideoRequest): Promise<void>;
  getVideo(id: string): Promise<VideoResponse>;
}
