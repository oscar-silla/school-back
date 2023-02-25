import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { Article } from "../../domain/article";
import { CustomError } from "../../exceptions/CustomError";
import { ArticleServicePort } from "../../ports/in/services/article.service.port";
import { ModifyArticleUseCasePort } from "../../ports/in/usecases/story/modify-article.usecase.port";
import { ArticleService } from "../../services/article.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class ModifyArticleUseCase implements ModifyArticleUseCasePort {
  private articleService: ArticleServicePort = new ArticleService();

  private checkPathParams(id: string): void {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  private checkBodyParams(article: Article): void {
    if (
      !article.getTitle() &&
      !article.getDescription() &&
      !article.getImg() &&
      !article.getContent()
    ) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  private checkParams(id: string, article: Article): void {
    this.checkPathParams(id);
    this.checkBodyParams(article);
  }

  async modifyArticle(id: string, article: Article): Promise<void> {
    this.checkParams(id, article);
    return this.articleService.modifyArticle(id, article);
  }
}
