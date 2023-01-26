import { StoryRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/story.repository.adapter";
import { GeneratedId } from "../domain/generated-id";
import { Story } from "../domain/story";
import { StoryServicePort } from "../ports/in/services/story.service.port";
import { StoryRepositoryPort } from "../ports/out/story.repository.port";

export class StoryService implements StoryServicePort {
  private storyRepository: StoryRepositoryPort = new StoryRepositoryAdapter();

  async createStory(story: Story): Promise<GeneratedId> {
    return await this.storyRepository.save(story);
  }
}
