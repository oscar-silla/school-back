import { Article } from "../../../../application/domain/article";
import { GeneratedIdModel } from "../models/generated-id.model";
import { ArticleModel } from "../models/article.model";

export class ArticlesCollection {
  async save(article: Article): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return await mongo.collection("articles").insertOne(article);
  }
  async find(limit: number, page: number): Promise<ArticleModel[]> {
    const { mongo } = global.database;
    return await mongo
      .collection("articles")
      .find({})
      .limit(limit)
      .skip(limit * page)
      .toArray();
  }
  async findOne(id: string): Promise<ArticleModel> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("articles").findOne({ _id: ObjectId(id) });
  }
  async modifyOne(id: string, article: Article): Promise<void> {
    const { ObjectId, mongo } = global.database;
    return await mongo
      .collection("articles")
      .updateOne({ _id: ObjectId(id) }, { $set: article });
  }
  async deleteOne(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("articles").deleteOne({ _id: ObjectId(id) });
  }
}
