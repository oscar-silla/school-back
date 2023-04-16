import express, { NextFunction, Request, Response } from "express";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { LastNewResponse } from "../../../../../external-libraries/openapi/models/LastNewResponse";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpStatus } from "../../../../application/domain/http-status";
import { LastNew } from "../../../../application/domain/last-new";
import { CreateLastNewUseCasePort } from "../../../../application/ports/in/usecases/lastnew/create-last-new-use-case.port";
import { DeleteLastNewUseCasePort } from "../../../../application/ports/in/usecases/lastnew/delete-last-new-use-case.port";
import { GetLastNewsUseCasePort } from "../../../../application/ports/in/usecases/lastnew/get-last-news-use-case.port";
import { GetLastNewUseCasePort } from "../../../../application/ports/in/usecases/lastnew/get-last-new-use-case.port";
import { ModifyLastNewUseCasePort } from "../../../../application/ports/in/usecases/lastnew/modify-last-new-use-case.port";
import { CreateLastNewUseCase } from "../../../../application/usecases/lastnew/create-last-new.usecase";
import { DeleteLastNewUseCase } from "../../../../application/usecases/lastnew/delete-last-new.usecase";
import { GetArticlesUseCase } from "../../../../application/usecases/lastnew/get-articles.usecase";
import { GetLastNewUseCase } from "../../../../application/usecases/lastnew/get-last-new.usecase";
import { ModifyLastNewUseCase } from "../../../../application/usecases/lastnew/modify-last-new.usecase";
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
  ): Promise<void> => {
    try {
      console.log("POST /lastNews");
      const lastNew: LastNew = lastNewMapper.toArticle(req?.body);
      const generatedId: GeneratedId = await createLastNewUseCase.createLastNew(
        lastNew
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
  ): Promise<void> => {
    try {
      console.log("GET /lastNews");
      const articles: LastNew[] = await getLastNewsUseCase.getLastNews(
        +(req?.query?.limit as string) ?? 0,
        +(req?.query?.page as string) ?? 0
      );
      const lastNewsResponse: LastNewResponse[] =
        lastNewMapper.toArticlesResponse(articles);
      res.status(HttpStatus.OK).json(lastNewsResponse);
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
  ): Promise<void> => {
    try {
      console.log("GET /lastNews/:id");
      const lastNew: LastNew = await getLastNewUseCase.getLastNew(
        req?.params?.id
      );
      const lastNewResponse: LastNewResponse =
        lastNewMapper.toArticleResponse(lastNew);
      res.status(HttpStatus.OK).json(lastNewResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  useExtract,
  async (
    req: Request,
    res: Response<void>,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("PATCH /lastNews/:id");
      const lastNew: LastNew = lastNewMapper.toArticle(req?.body);
      await modifyLastNewUseCase.modifyLastNew(req?.params?.id, lastNew);
      res.status(HttpStatus.OK).send();
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  useExtract,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log("DELETE /lastNews/:id");
      await deleteLastNewUseCase.deleteLastNew(req?.params?.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
