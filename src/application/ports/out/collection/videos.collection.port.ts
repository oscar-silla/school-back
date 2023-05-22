import { VideoModel } from "../../../../infrastructure/repository/mongo/models/video.model";
import { GeneratedIdModel } from "../../../../infrastructure/repository/mongo/models/generated-id.model";

export interface VideosCollectionPort {
  save(video: VideoModel): Promise<GeneratedIdModel>;
  getOneByRef(ref: string): Promise<VideoModel | null>;
  getOneById(id: string): Promise<VideoModel | null>;
  modify(id: string, videoModel: VideoModel): Promise<void>;
  deleteOneById(id: string): Promise<void>;
}
