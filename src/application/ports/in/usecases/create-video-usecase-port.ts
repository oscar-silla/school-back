import { VideoType } from "../../../../../external-libraries/openapi";

export interface CreateVideoUseCasePort {
  createVideo(): VideoType;
}
