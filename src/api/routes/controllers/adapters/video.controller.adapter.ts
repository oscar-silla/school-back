import express from "express";
import { HttpCode } from "../../../../application/domain/HttpCode";
import { CreateVideoUseCase } from "../../../../application/usecases/video/create-video.usecase";
import {
  VideoRequest,
  VideoResponse,
} from "../../../../../external-libraries/openapi";
const router = express.Router();

const createVideoUseCase = new CreateVideoUseCase();

router.post(
  "/",
  async (
    req: express.Request<VideoRequest>,
    res: express.Response<VideoResponse>
  ) => {
    await createVideoUseCase.createVideo(req.body).catch((e) => e);
    res.status(HttpCode.CREATED).send;
  }
);

export default router;
