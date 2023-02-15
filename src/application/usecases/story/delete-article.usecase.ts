import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { CustomError } from "../../exceptions/CustomError";
import { ArticleServicePort } from "../../ports/in/services/article.service.port";
import { DeleteArticleUseCasePort } from "../../ports/in/usecases/story/delete-article.usecase.port";
import { ArticleService } from "../../services/story.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class DeleteStoryUseCase implements DeleteArticleUseCasePort {
  private articleService: ArticleServicePort = new ArticleService();

  private checkPathParams(id: string): void {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }

  async deleteArticle(id: string): Promise<void> {
    this.checkPathParams(id);
    await this.articleService.deleteArticle(id);
  }
}
