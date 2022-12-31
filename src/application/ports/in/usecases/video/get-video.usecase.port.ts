import { Video } from "../../../../domain/video";

export interface GetVideoUseCasePort {
  getVideo(id: String): Promise<Video>;
}
