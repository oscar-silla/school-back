import express, { Request, Response, NextFunction } from "express";
import { VideoBody } from "../../../../../external-libraries/openapi/models/VideoBody";
import { VideoResponse } from "../../../../../external-libraries/openapi/models/VideoResponse";
import { HttpCode } from "../../../../application/domain/http-code";
import { Video } from "../../../../application/domain/video";
import { CreateVideoUseCase } from "../../../../application/usecases/video/create-video.usecase";
import { GetVideoUseCase } from "../../../../application/usecases/video/get-video.usecase";
import { ModifyVideoUseCase } from "../../../../application/usecases/video/modify-video.usecase";
import { VideoControllerMapper } from "../mappers/video.controller.mapper";
const router = express.Router();

const getVideoUseCase = new GetVideoUseCase();
const createVideoUseCase = new CreateVideoUseCase();
const modifyVideoUseCase = new ModifyVideoUseCase();

const videoMapper = new VideoControllerMapper();

router.post(
  "/",
  async (req: Request<VideoBody>, res: Response<void>, next: NextFunction) => {
    try {
      const video = videoMapper.toVideo(req?.body);
      await createVideoUseCase.createVideo(video);
      res.status(HttpCode.CREATED).send();
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:_id",
  async (req: Request, res: Response<VideoResponse>, next: NextFunction) => {
    try {
      const video: Video = await getVideoUseCase.getVideo(req?.params?._id);
      const videoResponse: VideoResponse = videoMapper.toVideoResponse(video);
      res.status(HttpCode.OK).json(videoResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  async (req: Request, res: Response<void>, next: NextFunction) => {
    try {
      const video = videoMapper.toVideo(req?.body);
      await modifyVideoUseCase.modifyVideo(req?.params?.id, video);
      res.status(HttpCode.OK).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
