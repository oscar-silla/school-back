import {
  VideoRequest,
  VideoResponse,
} from "../../../../external-libraries/openapi";

export interface VideoRepositoryPort {
  save(videoRequest: VideoRequest): Promise<void>;
  getOne(id: string): Promise<VideoResponse>;
}
