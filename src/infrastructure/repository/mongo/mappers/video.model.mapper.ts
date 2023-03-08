import { Video } from "../../../../application/domain/video";
import { VideoDao } from "../models/video.dao";

export class VideoMapperModel {
  toVideo(videoModel: VideoDao): Video {
    const video = new Video();
    video.setId(videoModel?._id);
    video.setRef(videoModel?.ref);
    video.setSrc(videoModel?.src);
    return video;
  }
}
