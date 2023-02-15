import express, { Request, Response, NextFunction } from "express";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { ArticleResponse } from "../../../../../external-libraries/openapi/models/ArticleResponse";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpCode } from "../../../../application/domain/http-code";
import { Article } from "../../../../application/domain/article";
import { CreateArticleUseCasePort } from "../../../../application/ports/in/usecases/story/create-article.usecase.port";
import { DeleteArticleUseCasePort } from "../../../../application/ports/in/usecases/story/delete-article.usecase.port";
import { GetArticlesUseCasePort } from "../../../../application/ports/in/usecases/story/get-articles.usecase.port";
import { GetArticleUseCasePort } from "../../../../application/ports/in/usecases/story/get-article.usecase.port";
import { ModifyArticleUseCasePort } from "../../../../application/ports/in/usecases/story/modify-article.usecase.port";
import { CreateStoryUseCase } from "../../../../application/usecases/article/create-article.usecase";
import { DeleteStoryUseCase } from "../../../../application/usecases/article/delete-article.usecase";
import { GetArticlesUseCase } from "../../../../application/usecases/article/get-articles.usecase";
import { GetStoryUseCase } from "../../../../application/usecases/article/get-article.usecase";
import { ModifyArticleUseCase } from "../../../../application/usecases/article/modify-article.usecase";
import { authExtract } from "../../../middlewares/auth-extract";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { ArticleControllerMapper } from "../mappers/article.controller.mapper";

const router = express.Router();

const createArticleUseCase: CreateArticleUseCasePort = new CreateStoryUseCase();
const getArticlesUseCase: GetArticlesUseCasePort = new GetArticlesUseCase();
const getArticleUseCase: GetArticleUseCasePort = new GetStoryUseCase();
const modifyArticleUseCase: ModifyArticleUseCasePort =
  new ModifyArticleUseCase();
const deleteArticleUseCase: DeleteArticleUseCasePort = new DeleteStoryUseCase();

const articleMapper = new ArticleControllerMapper();
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
      const article = articleMapper.toArticle(req?.body);
      const generatedId: GeneratedId = await createArticleUseCase.createArticle(
        article
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
  async (
    req: Request,
    res: Response<ArticleResponse[]>,
    next: NextFunction
  ) => {
    try {
      const articles: Article[] = await getArticlesUseCase.getArticles(
        req?.params?.limit ?? "",
        req?.params?.page ?? ""
      );
      const articlesResponse: ArticleResponse[] =
        articleMapper.toArticlesResponse(articles);
      res.status(HttpCode.OK).json(articlesResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article: Article = await getArticleUseCase.getArticle(
      req?.params?.id
    );
    const articleResponse: ArticleResponse =
      articleMapper.toArticleResponse(article);
    res.status(HttpCode.OK).json(articleResponse);
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/:id",
  authExtract,
  async (req: Request, res: Response<void>, next: NextFunction) => {
    try {
      const story: Article = articleMapper.toArticle(req?.body);
      await modifyArticleUseCase.modifyArticle(req?.params?.id, story);
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
      await deleteArticleUseCase.deleteArticle(req?.params?.id);
      res.status(HttpCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
