import { GeneratedId } from "../../domain/generated-id";
import { Article } from "../../domain/article";

export interface ArticleRepositoryPort {
  save(article: Article): Promise<GeneratedId>;
  find(limit: number, page: number): Promise<Article[]>;
  findOne(id: string): Promise<Article>;
  modifyOne(id: string, article: Article): Promise<void>;
  deleteOne(id: string): Promise<void>;
}
