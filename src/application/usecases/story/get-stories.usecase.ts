import { Story } from "../../domain/story";
import { StoryServicePort } from "../../ports/in/services/story.service.port";
import { GetStoriesUseCasePort } from "../../ports/in/usecases/story/get-stories.usecase.port";
import { StoryService } from "../../services/story.service";

export class GetStoriesUseCase implements GetStoriesUseCasePort {
  private storyService: StoryServicePort = new StoryService();

  async getStories(): Promise<Story[]> {
    return await this.storyService.getStories();
  }
}
