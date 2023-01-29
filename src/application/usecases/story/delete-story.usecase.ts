import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { CustomError } from "../../exceptions/CustomError";
import { StoryServicePort } from "../../ports/in/services/story.service.port";
import { DeleteStoryUseCasePort } from "../../ports/in/usecases/story/delete-story.usecase.port";
import { StoryService } from "../../services/story.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class DeleteStoryUseCase implements DeleteStoryUseCasePort {
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

  async deleteStory(id: string): Promise<void> {
    this.checkPathParams(id);
    await this.storyService.deleteStory(id);
  }
}
