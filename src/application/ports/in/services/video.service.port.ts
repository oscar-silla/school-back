import { GeneratedId } from "../../../domain/generated-id";
import { Video } from "../../../domain/video";

export interface VideoServicePort {
  getVideoByRef(ref: string): Promise<Video>;
  getVideoById(id: string): Promise<Video>;
  createVideo(requestBody: Video): Promise<GeneratedId>;
  modifyVideo(id: string, requestBody: Video): Promise<void>;
  deleteVideo(id: string): Promise<void>;
}
