import { GeneratedId } from "../../../../domain/generated-id";
import { Article } from "../../../../domain/article";

export interface CreateArticleUseCasePort {
  createArticle(article: Article): Promise<GeneratedId>;
}
