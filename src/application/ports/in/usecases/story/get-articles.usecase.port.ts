import { Article } from "../../../../domain/article";

export interface GetArticlesUseCasePort {
  getArticles(): Promise<Article[]>;
}
