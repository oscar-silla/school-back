import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { Story } from "../../domain/story";
import { CustomError } from "../../exceptions/CustomError";
import { StoryServicePort } from "../../ports/in/services/story.service.port";
import { ModifyStoryUseCasePort } from "../../ports/in/usecases/story/modify-story.usecase.port";
import { StoryService } from "../../services/story.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class ModifyStoryUseCase implements ModifyStoryUseCasePort {
  private storyService: StoryServicePort = new StoryService();

  private checkPathParams(id: string): void {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }

  private checkBodyParams(story: Story): void {
    if (
      !story.getTitle() &&
      !story.getDescription() &&
      !story.getImg() &&
      !story.getContent()
    ) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }

  private checkParams(id: string, story: Story): void {
    this.checkPathParams(id);
    this.checkBodyParams(story);
  }

  async modifyStory(id: string, story: Story): Promise<void> {
    this.checkParams(id, story);
    return this.storyService.modifyStory(id, story);
  }
}
