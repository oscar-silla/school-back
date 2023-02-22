import { GeneratedId } from "../../domain/generated-id";
import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { Article } from "../../domain/article";
import { CustomError } from "../../exceptions/CustomError";
import { ArticleServicePort } from "../../ports/in/services/article.service.port";
import { CreateArticleUseCasePort } from "../../ports/in/usecases/story/create-article.usecase.port";
import { ArticleService } from "../../services/article.service";

export class CreateStoryUseCase implements CreateArticleUseCasePort {
  private articleService: ArticleServicePort = new ArticleService();

  private checkBodyParams(article: Article): void {
    if (!article.getTitle() || !article.getContent()) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async createArticle(article: Article): Promise<GeneratedId> {
    this.checkBodyParams(article);
    return this.articleService.createArticle(article);
  }
}
