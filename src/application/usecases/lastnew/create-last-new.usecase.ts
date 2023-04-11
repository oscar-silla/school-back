import { GeneratedId } from "../../domain/generated-id";
import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { LastNew } from "../../domain/last-new";
import { CustomError } from "../../exceptions/CustomError";
import { LastNewServicePort } from "../../ports/in/services/last-new.service.port";
import { CreateLastNewUseCasePort } from "../../ports/in/usecases/story/create-last-new-use-case.port";
import { LastNewService } from "../../services/last-new.service";

export class CreateLastNewUseCase implements CreateLastNewUseCasePort {
  private lastNewService: LastNewServicePort = new LastNewService();

  private checkBodyParams(article: LastNew): void {
    if (!article.getTitle() || !article.getContent()) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async createLastNew(lastNew: LastNew): Promise<GeneratedId> {
    this.checkBodyParams(lastNew);
    return this.lastNewService.createLastNew(lastNew);
  }
}