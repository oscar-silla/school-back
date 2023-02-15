import { GeneratedId } from "../../../domain/generated-id";
import { Article } from "../../../domain/article";

export interface ArticleServicePort {
  createArticle(article: Article): Promise<GeneratedId>;
  getArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article>;
  modifyArticle(id: string, article: Article): Promise<void>;
  deleteArticle(id: string): Promise<void>;
}
