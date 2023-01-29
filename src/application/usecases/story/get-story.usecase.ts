import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { Story } from "../../domain/story";
import { CustomError } from "../../exceptions/CustomError";
import { StoryServicePort } from "../../ports/in/services/story.service.port";
import { GetStoryUseCasePort } from "../../ports/in/usecases/story/get-story.usecase.port";
import { StoryService } from "../../services/story.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class GetStoryUseCase implements GetStoryUseCasePort {
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

  async getStory(id: string): Promise<Story> {
    this.checkPathParams(id);
    return await this.storyService.getStory(id);
  }
}
