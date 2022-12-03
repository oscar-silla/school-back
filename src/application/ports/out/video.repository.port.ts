import {
  VideoRequest,
  VideoResponse,
  VideoSourceRequest,
} from "../../../../external-libraries/openapi";

export interface VideoRepositoryPort {
  save(payload: VideoRequest): Promise<void>;
  getOne(id: string): Promise<VideoResponse>;
  modify(id: string, payload: VideoSourceRequest): Promise<void>;
}
