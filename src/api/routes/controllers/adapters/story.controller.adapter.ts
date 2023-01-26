import express, { Request, Response, NextFunction } from "express";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { StoryBody } from "../../../../../external-libraries/openapi/models/StoryBody";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpCode } from "../../../../application/domain/http-code";
import { CreateStoryUseCasePort } from "../../../../application/ports/in/usecases/story/create-story.usecase.port";
import { CreateStoryUseCase } from "../../../../application/usecases/story/create-story.usecase";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { StoryControllerMapper } from "../mappers/story.controller.mapper";

const router = express.Router();

const createStoryUseCase: CreateStoryUseCasePort = new CreateStoryUseCase();

const storyMapper = new StoryControllerMapper();
const generatedIdMapper = new GeneratedIdMapper();

router.post(
  "/",
  async (
    req: Request<StoryBody>,
    res: Response<GeneratedIdResponse>,
    next: NextFunction
  ) => {
    try {
      const story = storyMapper.toNew(req?.body);
      const generatedId: GeneratedId = await createStoryUseCase.createStory(
        story
      );
      const generatedIdResponse: GeneratedIdResponse =
        generatedIdMapper.toGeneratedIdResponse(generatedId);
      res.status(HttpCode.CREATED).json(generatedIdResponse);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
