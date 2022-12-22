import { VideoRequest } from "../../../../external-libraries/openapi/models/VideoRequest";
import { VideoResponse } from "../../../../external-libraries/openapi/models/VideoResponse";
import { VideoSourceRequest } from "../../../../external-libraries/openapi/models/VideoSourceRequest";

export interface VideoRepositoryPort {
  save(payload: VideoRequest): Promise<void>;
  getOne(id: string): Promise<VideoResponse>;
  modify(id: string, payload: VideoSourceRequest): Promise<void>;
}
