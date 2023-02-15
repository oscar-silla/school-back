import { Article } from "../../../../domain/article";

export interface GetArticleUseCasePort {
  getArticle(id: string): Promise<Article>;
}
