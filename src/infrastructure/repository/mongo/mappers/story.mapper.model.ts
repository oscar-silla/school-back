import { Article } from "../../../../application/domain/article";
import { ArticleModel } from "../models/article.model";

export class ArticleMapperModel {
  toArticle(articleModel: ArticleModel): Article {
    const article: Article = new Article();
    article.setId(articleModel?._id ?? "");
    article.setTitle(articleModel?.title ?? "");
    article.setDescription(articleModel?.description ?? "");
    article.setImg(articleModel?.img ?? "");
    article.setContent(articleModel?.content ?? "");
    return article;
  }
  toArticles(articleModels: ArticleModel[]): Article[] {
    return articleModels.map((articleModel) => this.toArticle(articleModel));
  }
}
