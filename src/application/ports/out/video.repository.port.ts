import { Video } from "../../domain/video";

export interface VideoRepositoryPort {
  save(payload: Video): Promise<void>;
  getOne(id: string): Promise<Video>;
  modify(id: string, payload: Video): Promise<void>;
}
