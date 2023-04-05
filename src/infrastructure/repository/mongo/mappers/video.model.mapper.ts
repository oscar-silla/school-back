import { Video } from "../../../../application/domain/video";
import { VideoModel } from "../models/video.model";

export class VideoModelMapper {
  toVideoModel(video: Video | any): VideoModel {
    const videoModel: VideoModel = new VideoModel();
    if (video instanceof Video) {
      videoModel.setRef(video?.getRef() ?? "");
      videoModel.setSrc(video?.getSrc() ?? "");
    } else {
      videoModel.setId(video?._id ?? "");
      videoModel.setRef(video?.ref ?? "");
      videoModel.setSrc(video?.src ?? "");
    }
    return videoModel;
  }
  toVideo(videoModel: VideoModel): Video {
    const video: Video = new Video();
    video.setId(videoModel?.getId() ?? "");
    video.setRef(videoModel?.getRef() ?? "");
    video.setSrc(videoModel?.getSrc() ?? "");
    return video;
  }
}
