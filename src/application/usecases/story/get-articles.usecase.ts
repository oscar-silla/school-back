import { Article } from "../../domain/article";
import { ArticleServicePort } from "../../ports/in/services/article.service.port";
import { GetArticlesUseCasePort } from "../../ports/in/usecases/story/get-articles.usecase.port";
import { ArticleService } from "../../services/story.service";

export class GetArticlesUseCase implements GetArticlesUseCasePort {
  private storyService: ArticleServicePort = new ArticleService();

  async getArticles(): Promise<Article[]> {
    return await this.storyService.getArticles();
  }
}
