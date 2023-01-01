import { Video } from "../../../domain/video";

export interface VideoServicePort {
  getVideo(id: string): Promise<Video>;
  createVideo(requestBody: Video): Promise<void>;
  modifyVideo(id: string, requestBody: Video): Promise<void>;
}
