import { VideoRequest } from "../../../../../external-libraries/openapi";
import { Video } from "../../../../application/domain/video";
import { VideoRepositoryPort } from "../../../../application/ports/out/video.repository.port";
import { VideosCollection } from "../collections/videos.collection";

export class VideoRepositoryAdapter implements VideoRepositoryPort {
  private videosCollection = new VideosCollection();

  async save(videoRequest: VideoRequest): Promise<Video> {
    const video = await this.videosCollection.save(videoRequest);
    console.log(video);
    const vid: Video = {
      _id: "11",
      ref: "pepe",
      src: "eqwe",
    };
    return vid;
  }
}
