import { GeneratedId } from "../../domain/generated-id";
import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { Story } from "../../domain/story";
import { CustomError } from "../../exceptions/CustomError";
import { StoryServicePort } from "../../ports/in/services/story.service.port";
import { CreateStoryUseCasePort } from "../../ports/in/usecases/story/create-story.usecase.port";
import { StoryService } from "../../services/story.service";

export class CreateStoryUseCase implements CreateStoryUseCasePort {
  private storyService: StoryServicePort = new StoryService();

  private checkBodyParams(story: Story): void {
    if (!story.getTitle() || !story.getContent()) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }
  async createStory(story: Story): Promise<GeneratedId> {
    this.checkBodyParams(story);
    return this.storyService.createStory(story);
  }
}
