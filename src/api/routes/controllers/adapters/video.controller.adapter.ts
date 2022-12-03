import express, { Request, Response, NextFunction } from "express";
import { HttpCode } from "../../../../application/domain/http-code";
import { CreateVideoUseCase } from "../../../../application/usecases/video/create-video.usecase";
import {
  VideoRequest,
  VideoResponse,
} from "../../../../../external-libraries/openapi";
import { GetVideoUseCase } from "../../../../application/usecases/video/get-video.usecase";
import { ModifyVideoUseCase } from "../../../../application/usecases/video/modify-video.usecase";
const router = express.Router();

const getVideoUseCase = new GetVideoUseCase();
const createVideoUseCase = new CreateVideoUseCase();
const modifyVideoUseCase = new ModifyVideoUseCase();

router.post(
  "/",
  async (
    req: Request<VideoRequest>,
    res: Response<void>,
    next: NextFunction
  ) => {
    try {
      await createVideoUseCase.createVideo(req.body);
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
      const video = await getVideoUseCase.getVideo(req?.params?._id);
      res.status(HttpCode.OK).json(video);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  async (req: Request, res: Response<void>, next: NextFunction) => {
    try {
      await modifyVideoUseCase.modifyVideo(req?.params?.id, req?.body);
      res.status(HttpCode.OK).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
