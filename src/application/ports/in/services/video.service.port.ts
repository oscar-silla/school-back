import { GeneratedId } from "../../../domain/generated-id";
import { Video } from "../../../domain/video";

export interface VideoServicePort {
  getVideo(id: string): Promise<Video>;
  createVideo(requestBody: Video): Promise<GeneratedId>;
  modifyVideo(id: string, requestBody: Video): Promise<void>;
}
