import { Article } from "../../../../domain/article";

export interface GetArticlesUseCasePort {
  getArticles(limit?: string, page?: string): Promise<Article[]>;
}
