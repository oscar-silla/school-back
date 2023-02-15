import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { Article } from "../../domain/article";
import { CustomError } from "../../exceptions/CustomError";
import { ArticleServicePort } from "../../ports/in/services/article.service.port";
import { GetArticleUseCasePort } from "../../ports/in/usecases/story/get-article.usecase.port";
import { ArticleService } from "../../services/story.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class GetStoryUseCase implements GetArticleUseCasePort {
  private storyService: ArticleServicePort = new ArticleService();

  private checkPathParams(id: string): void {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }

  async getArticle(id: string): Promise<Article> {
    this.checkPathParams(id);
    return await this.storyService.getArticle(id);
  }
}
