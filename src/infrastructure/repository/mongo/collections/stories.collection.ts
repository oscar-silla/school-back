import { Story } from "../../../../application/domain/story";
import { GeneratedIdModel } from "../models/generated-id.model";

export class StoriesCollection {
  async save(story: Story): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return await mongo.collection("stories").insertOne(story);
  }
}
