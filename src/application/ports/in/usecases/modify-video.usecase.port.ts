import { VideoSourceRequest } from "../../../../../external-libraries/openapi";

export interface ModifyVideoUseCasePort {
  modifyVideo(id: string, body: VideoSourceRequest): Promise<void>;
}
