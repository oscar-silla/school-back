import { GeneratedId } from "../../../domain/generated-id";
import { Article } from "../../../domain/article";

export interface ArticleServicePort {
  createArticle(article: Article): Promise<GeneratedId>;
  getAllArticles(): Promise<Article[]>;
  getPaginatedArticles(limit: string, page: string): Promise<Article[]>;
  getArticle(id: string): Promise<Article>;
  modifyArticle(id: string, article: Article): Promise<void>;
  deleteArticle(id: string): Promise<void>;
}
