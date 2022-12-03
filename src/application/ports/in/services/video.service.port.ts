import {
  VideoRequest,
  VideoResponse,
  VideoSourceRequest,
} from "../../../../../external-libraries/openapi";

export interface VideoServicePort {
  getVideo(id: string): Promise<VideoResponse>;
  createVideo(requestBody: VideoRequest): Promise<void>;
  modifyVideo(id: string, requestBody: VideoSourceRequest): Promise<void>;
}
