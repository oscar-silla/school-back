import { Video } from "../../../../domain/video";

export interface GetVideoUseCasePort {
  getVideo(ref: String): Promise<Video>;
}
