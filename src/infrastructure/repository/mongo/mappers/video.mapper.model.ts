import { Video } from "../../../../application/domain/video";
import { VideoModel } from "../models/video.model";

export class VideoMapperModel {
  toVideo(videoModel: VideoModel): Video {
    const video = new Video();
    video.setId(videoModel?._id);
    video.setRef(videoModel?.ref);
    video.setSrc(videoModel?.src);
    return video;
  }
}
