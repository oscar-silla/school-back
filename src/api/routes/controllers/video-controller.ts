import express from "express";
import { CreateVideoUseCase } from "../../../application/usecases/video/create-video-usecase";
const router = express.Router();

const createVideoUseCase = new CreateVideoUseCase();

router.post("/", (_req, _res) => {
  const { src, ref } = createVideoUseCase.createVideo();
  _res.status(201).json({
    record: {
      src,
      ref,
    },
    description: "OK",
  });
});

export default router;
