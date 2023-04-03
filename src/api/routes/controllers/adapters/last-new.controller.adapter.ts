import express, { NextFunction, Request, Response } from "express";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { LastNewResponse } from "../../../../../external-libraries/openapi/models/LastNewResponse";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpStatus } from "../../../../application/domain/http-status";
import { LastNew } from "../../../../application/domain/last-new";
import { CreateLastNewUseCasePort } from "../../../../application/ports/in/usecases/story/create-last-new-use-case.port";
import { DeleteLastNewUseCasePort } from "../../../../application/ports/in/usecases/story/delete-last-new-use-case.port";
import { GetLastNewsUseCasePort } from "../../../../application/ports/in/usecases/story/get-last-news-use-case.port";
import { GetLastNewUseCasePort } from "../../../../application/ports/in/usecases/story/get-last-new-use-case.port";
import { ModifyLastNewUseCasePort } from "../../../../application/ports/in/usecases/story/modify-last-new-use-case.port";
import { CreateLastNewUseCase } from "../../../../application/usecases/article/create-last-new.usecase";
import { DeleteLastNewUseCase } from "../../../../application/usecases/article/delete-last-new.usecase";
import { GetArticlesUseCase } from "../../../../application/usecases/article/get-articles.usecase";
import { GetLastNewUseCase } from "../../../../application/usecases/article/get-last-new.usecase";
import { ModifyLastNewUseCase } from "../../../../application/usecases/article/modify-last-new.usecase";
import { useExtract } from "../../../middlewares/use-extract";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { LastNewControllerMapper } from "../mappers/last-new.controller.mapper";

const router = express.Router();
type idParam = {
  id: string;
};

const createLastNewUseCase: CreateLastNewUseCasePort =
  new CreateLastNewUseCase();
const getLastNewsUseCase: GetLastNewsUseCasePort = new GetArticlesUseCase();
const getLastNewUseCase: GetLastNewUseCasePort = new GetLastNewUseCase();
const modifyLastNewUseCase: ModifyLastNewUseCasePort =
  new ModifyLastNewUseCase();
const deleteLastNewUseCase: DeleteLastNewUseCasePort =
  new DeleteLastNewUseCase();

const lastNewMapper = new LastNewControllerMapper();
const generatedIdMapper = new GeneratedIdMapper();

router.post(
  "/",
  useExtract,
  async (
    req: Request,
    res: Response<GeneratedIdResponse>,
    next: NextFunction
  ) => {
    try {
      const article = lastNewMapper.toArticle(req?.body);
      const generatedId: GeneratedId = await createLastNewUseCase.createLastNew(
        article
      );
      const generatedIdResponse: GeneratedIdResponse =
        generatedIdMapper.toGeneratedIdResponse(generatedId);
      res.status(HttpStatus.CREATED).json(generatedIdResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/",
  async (
    req: Request,
    res: Response<LastNewResponse[]>,
    next: NextFunction
  ) => {
    try {
      const articles: LastNew[] = await getLastNewsUseCase.getLastNews(
        +(req?.query?.limit as string) ?? 0,
        +(req?.query?.page as string) ?? 0
      );
      const articlesResponse: LastNewResponse[] =
        lastNewMapper.toArticlesResponse(articles);
      res.status(HttpStatus.OK).json(articlesResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  async (
    req: Request<idParam, any, any, any>,
    res: Response<LastNewResponse>,
    next: NextFunction
  ) => {
    try {
      const article: LastNew = await getLastNewUseCase.getLastNew(
        req?.params?.id
      );
      const lastNewResponse: LastNewResponse =
        lastNewMapper.toArticleResponse(article);
      res.status(HttpStatus.OK).json(lastNewResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  useExtract,
  async (req: Request, res: Response<void>, next: NextFunction) => {
    try {
      const story: LastNew = lastNewMapper.toArticle(req?.body);
      await modifyLastNewUseCase.modifyLastNew(req?.params?.id, story);
      res.status(HttpStatus.OK).send();
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  useExtract,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteLastNewUseCase.deleteLastNew(req?.params?.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
