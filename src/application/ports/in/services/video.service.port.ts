import { VideoRequest } from "../../../../../external-libraries/openapi/models/VideoRequest";
import { VideoResponse } from "../../../../../external-libraries/openapi/models/VideoResponse";
import { VideoSourceRequest } from "../../../../../external-libraries/openapi/models/VideoSourceRequest";

export interface VideoServicePort {
  getVideo(id: string): Promise<VideoResponse>;
  createVideo(requestBody: VideoRequest): Promise<void>;
  modifyVideo(id: string, requestBody: VideoSourceRequest): Promise<void>;
}
