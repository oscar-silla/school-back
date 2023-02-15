import { ArticleBody } from "../../../../../external-libraries/openapi/models/ArticleBody";
import { ArticleResponse } from "../../../../../external-libraries/openapi/models/ArticleResponse";
import { Article } from "../../../../application/domain/article";

export class ArticleControllerMapper {
  toArticle(articleBody: ArticleBody): Article {
    const article = new Article();
    article.setTitle(articleBody.title ?? "");
    article.setDescription(articleBody.description ?? "");
    article.setImg(articleBody.img ?? "");
    article.setContent(articleBody.content ?? "");
    return article;
  }
  toArticleResponse(article: Article): ArticleResponse {
    const articleResponse = new ArticleResponse();
    articleResponse.id = article.getId() ?? "";
    articleResponse.title = article.getTitle() ?? "";
    articleResponse.description = article.getDescription() ?? "";
    articleResponse.img = article.getImg() ?? "";
    articleResponse.content = article.getContent() ?? "";
    return articleResponse;
  }
  toArticlesResponse(articles: Article[]): ArticleResponse[] {
    return articles.map((article) => this.toArticleResponse(article));
  }
}
