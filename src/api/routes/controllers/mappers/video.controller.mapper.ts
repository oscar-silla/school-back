import { VideoBody } from "../../../../../external-libraries/openapi/models/VideoBody";
import { VideoResponse } from "../../../../../external-libraries/openapi/models/VideoResponse";
import { Video } from "../../../../application/domain/video";

export class VideoControllerMapper {
  toVideo(body: VideoBody): Video {
    const video: Video = new Video();
    video.setRef(body.ref);
    video.setSrc(body.src);
    return video;
  }
  toVideoResponse(video: Video): VideoResponse {
    const videoResponse: VideoResponse = new VideoResponse();
    videoResponse.id = video.getId();
    videoResponse.ref = video.getRef();
    videoResponse.src = video.getSrc();
    return videoResponse;
  }
}
