import { GeneratedId } from "../../../../domain/generated-id";
import { Video } from "../../../../domain/video";

export interface CreateVideoUseCasePort {
  createVideo(body: Video): Promise<GeneratedId>;
}
