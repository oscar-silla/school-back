import { Article } from "../../domain/article";
import { ArticleServicePort } from "../../ports/in/services/article.service.port";
import { GetArticlesUseCasePort } from "../../ports/in/usecases/story/get-articles.usecase.port";
import { ArticleService } from "../../services/article.service";

export class GetArticlesUseCase implements GetArticlesUseCasePort {
  private articleService: ArticleServicePort = new ArticleService();

  async getArticles(limit: number, page: number): Promise<Article[]> {
    return await this.articleService.getArticles(limit, page);
  }
}
