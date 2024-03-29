import express, { NextFunction, Request, Response } from "express";
import { VideoResponse } from "../../../../../external-libraries/openapi/models/VideoResponse";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpStatus } from "../../../../application/domain/http-status";
import { Video } from "../../../../application/domain/video";
import { CreateVideoUseCasePort } from "../../../../application/ports/in/usecases/video/create-video.usecase.port";
import { DeleteVideoUseCasePort } from "../../../../application/ports/in/usecases/video/delete-video.usecase.port";
import { GetVideoUseCasePort } from "../../../../application/ports/in/usecases/video/get-video.usecase.port";
import { ModifyVideoUseCasePort } from "../../../../application/ports/in/usecases/video/modify-video.usecase.port";
import { CreateVideoUseCase } from "../../../../application/usecases/video/create-video.usecase";
import { DeleteVideoUseCase } from "../../../../application/usecases/video/delete-video.usecase";
import { GetVideoUseCase } from "../../../../application/usecases/video/get-video.usecase";
import { ModifyVideoUseCase } from "../../../../application/usecases/video/modify-video.usecase";
import { useExtract } from "../../../middlewares/use-extract";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { VideoControllerMapper } from "../mappers/video.controller.mapper";

const router = express.Router();

const getVideoUseCase: GetVideoUseCasePort = new GetVideoUseCase();
const createVideoUseCase: CreateVideoUseCasePort = new CreateVideoUseCase();
const modifyVideoUseCase: ModifyVideoUseCasePort = new ModifyVideoUseCase();
const deleteVideoUseCase: DeleteVideoUseCasePort = new DeleteVideoUseCase();

const videoMapper = new VideoControllerMapper();
const generatedIdMapper = new GeneratedIdMapper();

router.post(
  "/",
  useExtract,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const video = videoMapper.toVideo(req?.body);
      const generatedId: GeneratedId = await createVideoUseCase.createVideo(
        video
      );
      const generatedIdResponse =
        generatedIdMapper.toGeneratedIdResponse(generatedId);
      res.status(HttpStatus.CREATED).json(generatedIdResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:ref",
  async (req: Request, res: Response<VideoResponse>, next: NextFunction) => {
    try {
      const video: Video = await getVideoUseCase.getVideo(req?.params?.ref);
      const videoResponse: VideoResponse = videoMapper.toVideoResponse(video);
      res.status(HttpStatus.OK).json(videoResponse);
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
      res.status(HttpStatus.OK).send();
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteVideoUseCase.deleteVideo(req?.params?.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
