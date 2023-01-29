import { GeneratedId } from "../../../../application/domain/generated-id";
import { Story } from "../../../../application/domain/story";
import { StoryRepositoryPort } from "../../../../application/ports/out/story.repository.port";
import { StoriesCollection } from "../collections/stories.collection";
import { GeneratedIdMapperModel } from "../mappers/generated-id.mapper.model";
import { StoryMapperModel } from "../mappers/story.mapper.model";
import { GeneratedIdModel } from "../models/generated-id.model";
import { StoryModel } from "../models/story.model";

export class StoryRepositoryAdapter implements StoryRepositoryPort {
  private storiesCollection = new StoriesCollection();
  private storyMapperModel = new StoryMapperModel();
  private generatedIdMapper = new GeneratedIdMapperModel();

  async save(story: Story): Promise<GeneratedId> {
    const response: GeneratedIdModel = await this.storiesCollection.save(story);
    return this.generatedIdMapper.toGeneratedId(response);
  }

  async find(): Promise<Story[]> {
    const response: StoryModel[] = await this.storiesCollection.find();
    return this.storyMapperModel.toStories(response);
  }

  async findOne(id: string): Promise<Story> {
    const response: StoryModel = await this.storiesCollection.findOne(id);
    return this.storyMapperModel.toStory(response);
  }

  async modifyOne(id: string, story: Story): Promise<void> {
    await this.storiesCollection.modifyOne(id, story);
  }

  async deleteOne(id: string): Promise<void> {
    await this.storiesCollection.deleteOne(id);
  }
}
