import { GeneratedId } from "../../../../application/domain/generated-id";
import { Article } from "../../../../application/domain/article";
import { ArticleRepositoryPort } from "../../../../application/ports/out/article.repository.port";
import { ArticlesCollection } from "../collections/articles.collection";
import { GeneratedIdMapperModel } from "../mappers/generated-id.mapper.model";
import { ArticleMapperModel } from "../mappers/story.mapper.model";
import { GeneratedIdModel } from "../models/generated-id.model";
import { ArticleModel } from "../models/article.model";

export class ArticleRepositoryAdapter implements ArticleRepositoryPort {
  private articlesCollection = new ArticlesCollection();
  private articleMapperModel = new ArticleMapperModel();
  private generatedIdMapper = new GeneratedIdMapperModel();

  async save(article: Article): Promise<GeneratedId> {
    const response: GeneratedIdModel = await this.articlesCollection.save(
      article
    );
    return this.generatedIdMapper.toGeneratedId(response);
  }

  async find(limit: number, page: number): Promise<Article[]> {
    const response: ArticleModel[] = await this.articlesCollection.find(
      limit,
      page
    );
    return this.articleMapperModel.toArticles(response);
  }

  async findOne(id: string): Promise<Article> {
    const response: ArticleModel = await this.articlesCollection.findOne(id);
    return this.articleMapperModel.toArticle(response);
  }

  async modifyOne(id: string, article: Article): Promise<void> {
    await this.articlesCollection.modifyOne(id, article);
  }

  async deleteOne(id: string): Promise<void> {
    await this.articlesCollection.deleteOne(id);
  }
}
