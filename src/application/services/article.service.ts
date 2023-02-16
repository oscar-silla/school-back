import { ArticleRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/article.repository.adapter";
import { GeneratedId } from "../domain/generated-id";
import { HttpCode } from "../domain/http-code";
import { HttpMessage } from "../domain/http-message";
import { Article } from "../domain/article";
import { CustomError } from "../exceptions/CustomError";
import { ArticleServicePort } from "../ports/in/services/article.service.port";
import { ArticleRepositoryPort } from "../ports/out/article.repository.port";

export class ArticleService implements ArticleServicePort {
  private articleRepository: ArticleRepositoryPort =
    new ArticleRepositoryAdapter();

  async createArticle(article: Article): Promise<GeneratedId> {
    return await this.articleRepository.save(article);
  }

  async getArticles(limit: number, page: number): Promise<Article[]> {
    const articles: Article[] = await this.articleRepository.find(limit, page);
    this.checkIfIsItAnEmptyArticleList(articles);
    return articles;
  }

  async getArticle(id: string): Promise<Article> {
    const article: Article = await this.articleRepository.findOne(id);
    this.checkIfIsItAnEmptyArticle(article);
    return article;
  }

  async modifyArticle(id: string, article: Article): Promise<void> {
    const articleToModify: Article = await this.getArticle(id);
    const payload: Article = this.buildPayloadToModifyarticle(
      article,
      articleToModify
    );
    await this.articleRepository.modifyOne(id, payload);
  }

  async deleteArticle(id: string): Promise<void> {
    await this.getArticle(id);
    await this.articleRepository.deleteOne(id);
  }

  private buildPayloadToModifyarticle(
    article: Article,
    articleToModify: Article
  ): Article {
    const payload: Article = new Article();
    payload.setTitle(
      article.getTitle() ? article.getTitle() : articleToModify.getTitle()
    );
    payload.setDescription(
      article.getDescription()
        ? article.getDescription()
        : articleToModify.getDescription()
    );
    payload.setImg(
      article.getImg() ? article.getImg() : articleToModify.getImg()
    );
    payload.setContent(
      article.getContent() ? article.getContent() : articleToModify.getContent()
    );
    return payload;
  }

  private checkIfIsItAnEmptyArticle(article: Article): void {
    if (!article.getId()) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpCode.NOT_FOUND, {});
    }
  }
  private checkIfIsItAnEmptyArticleList(articles: Article[]): void {
    if (articles.length === 0) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpCode.NOT_FOUND, {});
    }
  }
}
