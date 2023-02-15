import { Article } from "../../domain/article";
import { ArticleServicePort } from "../../ports/in/services/article.service.port";
import { GetArticlesUseCasePort } from "../../ports/in/usecases/story/get-articles.usecase.port";
import { ArticleService } from "../../services/article.service";

export class GetArticlesUseCase implements GetArticlesUseCasePort {
  private articleService: ArticleServicePort = new ArticleService();

  private checkParams(limit: string, page: string): boolean {
    return limit && page ? true : false;
  }

  async getArticles(limit: string, page: string): Promise<Article[]> {
    return this.checkParams(limit, page)
      ? await this.articleService.getAllArticles()
      : await this.articleService.getPaginatedArticles(limit, page);
  }
}
