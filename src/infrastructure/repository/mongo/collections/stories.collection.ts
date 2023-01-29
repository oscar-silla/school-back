import { Story } from "../../../../application/domain/story";
import { GeneratedIdModel } from "../models/generated-id.model";
import { StoryModel } from "../models/story.model";

export class StoriesCollection {
  async save(story: Story): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return await mongo.collection("stories").insertOne(story);
  }
  async find(): Promise<StoryModel[]> {
    const { mongo } = global.database;
    return await mongo.collection("stories").find({}).toArray();
  }
  async findOne(id: string): Promise<StoryModel> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("stories").findOne({ _id: ObjectId(id) });
  }
  async modifyOne(id: string, story: Story): Promise<void> {
    const { ObjectId, mongo } = global.database;
    return await mongo
      .collection("stories")
      .updateOne({ _id: ObjectId(id) }, { $set: story });
  }
  async deleteOne(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("stories").deleteOne({ _id: ObjectId(id) });
  }
}
