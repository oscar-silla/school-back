import { Video } from "../../../../application/domain/video";
import { VideoModel } from "../models/video.model";
import {VideoType} from "../types/video.type";

export class VideoModelMapper {
  toVideoModel(video: Video | VideoType ): VideoModel | null {
    const videoModel: VideoModel = new VideoModel();
    if (video instanceof Video) {
      videoModel.setRef(video.getRef());
      videoModel.setSrc(video.getSrc());
    } else if (video?._id) {
      videoModel.setId(video._id);
      videoModel.setRef(video.ref);
      videoModel.setSrc(video.src);
    } else {
      return null;
    }
    return videoModel;
  }
  toVideo(videoModel: VideoModel | null): Video | null {
    if (!videoModel) {
      return null;
    }
    const video: Video = new Video();
    video.setId(videoModel.getId()!);
    video.setRef(videoModel.getRef());
    video.setSrc(videoModel.getSrc());
    return video;
  }
}
