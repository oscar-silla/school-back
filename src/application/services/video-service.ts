import { VideoType } from "../../../external-libraries/openapi";

export class VideoService {
  createVideo(): VideoType {
    const result: VideoType = {
      ref: "pepe",
      src: "http://youtube.com",
    };
    return result;
  }
}
