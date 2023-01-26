import { GeneratedId } from "../../../../application/domain/generated-id";
import { Story } from "../../../../application/domain/story";
import { StoryRepositoryPort } from "../../../../application/ports/out/story.repository.port";
import { StoriesCollection } from "../collections/stories.collection";
import { GeneratedIdMapperModel } from "../mappers/generated-id.mapper.model";
import { GeneratedIdModel } from "../models/generated-id.model";

export class StoryRepositoryAdapter implements StoryRepositoryPort {
  private storiesCollection = new StoriesCollection();
  private generatedIdMapper = new GeneratedIdMapperModel();

  async save(story: Story): Promise<GeneratedId> {
    const response: GeneratedIdModel = await this.storiesCollection.save(story);
    return this.generatedIdMapper.toGeneratedId(response);
  }
}
