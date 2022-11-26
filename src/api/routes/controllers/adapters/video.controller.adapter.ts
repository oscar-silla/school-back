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
    const { _id, ref, src } = await createVideoUseCase.createVideo(req.body);
    res.status(HttpCode.CREATED).json({
      id: _id,
      ref,
      src,
    });
  }
);

export default router;
