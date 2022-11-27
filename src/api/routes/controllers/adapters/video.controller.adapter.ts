import express, { Request, Response, NextFunction } from "express";
import { HttpCode } from "../../../../application/domain/HttpCode";
import { CreateVideoUseCase } from "../../../../application/usecases/video/create-video.usecase";
import { VideoRequest } from "../../../../../external-libraries/openapi";
const router = express.Router();

const createVideoUseCase = new CreateVideoUseCase();

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

export default router;
