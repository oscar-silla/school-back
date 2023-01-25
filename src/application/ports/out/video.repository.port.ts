import { GeneratedId } from "../../domain/generated-id";
import { Video } from "../../domain/video";

export interface VideoRepositoryPort {
  save(payload: Video): Promise<GeneratedId>;
  getOne(ref: string): Promise<Video>;
  modify(id: string, payload: Video): Promise<void>;
}
