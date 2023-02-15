import { Article } from "../../../../domain/article";

export interface ModifyArticleUseCasePort {
  modifyArticle(id: string, article: Article): Promise<void>;
}
