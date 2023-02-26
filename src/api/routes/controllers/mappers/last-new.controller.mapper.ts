import { LastNew } from "../../../../application/domain/last-new";
import { LastNewBody } from "../../../../../external-libraries/openapi/models/LastNewBody";
import { LastNewResponse } from "../../../../../external-libraries/openapi/models/LastNewResponse";

export class LastNewControllerMapper {
  toArticle(articleBody: LastNewBody): LastNew {
    const article = new LastNew();
    article.setTitle(articleBody.title ?? "");
    article.setDescription(articleBody.description ?? "");
    article.setImg(articleBody.img ?? "");
    article.setContent(articleBody.content ?? "");
    return article;
  }

  toArticleResponse(article: LastNew): LastNewResponse {
    const articleResponse = new LastNewResponse();
    articleResponse.id = article.getId() ?? "";
    articleResponse.title = article.getTitle() ?? "";
    articleResponse.description = article.getDescription() ?? "";
    articleResponse.img = article.getImg() ?? "";
    articleResponse.content = article.getContent() ?? "";
    return articleResponse;
  }

  toArticlesResponse(articles: LastNew[]): LastNewResponse[] {
    return articles.map((article) => this.toArticleResponse(article));
  }
}
