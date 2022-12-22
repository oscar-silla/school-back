import { VideoSourceRequest } from "../../../../../external-libraries/openapi/models/VideoSourceRequest";

export interface ModifyVideoUseCasePort {
  modifyVideo(id: string, body: VideoSourceRequest): Promise<void>;
}
