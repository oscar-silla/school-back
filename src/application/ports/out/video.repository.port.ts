import { GeneratedId } from "../../domain/generated-id";
import { Video } from "../../domain/video";

export interface VideoRepositoryPort {
  save(payload: Video): Promise<GeneratedId>;
  getOneByRef(ref: string): Promise<Video>;
  getOneById(id: string): Promise<Video>;
  modify(id: string, payload: Video): Promise<void>;
  deleteOne(id: string): Promise<void>;
}
