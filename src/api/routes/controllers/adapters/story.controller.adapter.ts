import express, { Request, Response, NextFunction } from "express";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { StoryResponse } from "../../../../../external-libraries/openapi/models/StoryResponse";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpCode } from "../../../../application/domain/http-code";
import { Story } from "../../../../application/domain/story";
import { CreateStoryUseCasePort } from "../../../../application/ports/in/usecases/story/create-story.usecase.port";
import { DeleteStoryUseCasePort } from "../../../../application/ports/in/usecases/story/delete-story.usecase.port";
import { GetStoriesUseCasePort } from "../../../../application/ports/in/usecases/story/get-stories.usecase.port";
import { GetStoryUseCasePort } from "../../../../application/ports/in/usecases/story/get-story.usecase.port";
import { ModifyStoryUseCasePort } from "../../../../application/ports/in/usecases/story/modify-story.usecase.port";
import { CreateStoryUseCase } from "../../../../application/usecases/story/create-story.usecase";
import { DeleteStoryUseCase } from "../../../../application/usecases/story/delete-story.usecase";
import { GetStoriesUseCase } from "../../../../application/usecases/story/get-stories.usecase";
import { GetStoryUseCase } from "../../../../application/usecases/story/get-story.usecase";
import { ModifyStoryUseCase } from "../../../../application/usecases/story/modify-story.usecase";
import { authExtract } from "../../../middlewares/auth-extract";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { StoryControllerMapper } from "../mappers/story.controller.mapper";

const router = express.Router();

const createStoryUseCase: CreateStoryUseCasePort = new CreateStoryUseCase();
const getStoriesUseCase: GetStoriesUseCasePort = new GetStoriesUseCase();
const getStoryUseCase: GetStoryUseCasePort = new GetStoryUseCase();
const modifyStoryUseCase: ModifyStoryUseCasePort = new ModifyStoryUseCase();
const deleteStoryUseCase: DeleteStoryUseCasePort = new DeleteStoryUseCase();

const storyMapper = new StoryControllerMapper();
const generatedIdMapper = new GeneratedIdMapper();

router.post(
  "/",
  authExtract,
  async (
    req: Request,
    res: Response<GeneratedIdResponse>,
    next: NextFunction
  ) => {
    try {
      const story = storyMapper.toStory(req?.body);
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

router.get(
  "/",
  async (_req: Request, res: Response<StoryResponse[]>, next: NextFunction) => {
    try {
      const stories: Story[] = await getStoriesUseCase.getStories();
      const storiesResponse: StoryResponse[] =
        storyMapper.toStoriesResponse(stories);
      res.status(HttpCode.OK).json(storiesResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const story: Story = await getStoryUseCase.getStory(req?.params?.id);
    const storyResponse: StoryResponse = storyMapper.toStoryResponse(story);
    res.status(HttpCode.OK).json(storyResponse);
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/:id",
  authExtract,
  async (req: Request, res: Response<void>, next: NextFunction) => {
    try {
      const story: Story = storyMapper.toStory(req?.body);
      await modifyStoryUseCase.modifyStory(req?.params?.id, story);
      res.status(HttpCode.OK).send();
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  authExtract,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteStoryUseCase.deleteStory(req?.params?.id);
      res.status(HttpCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
