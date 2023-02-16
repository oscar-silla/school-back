import { Article } from "../../../../domain/article";

export interface GetArticlesUseCasePort {
  getArticles(limit: number, page: number): Promise<Article[]>;
}
