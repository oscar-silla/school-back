import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { CustomError } from "../../exceptions/CustomError";
import { LastNewServicePort } from "../../ports/in/services/last-new.service.port";
import { DeleteLastNewUseCasePort } from "../../ports/in/usecases/story/delete-last-new-use-case.port";
import { LastNewService } from "../../services/last-new.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class DeleteLastNewUseCase implements DeleteLastNewUseCasePort {
  private lastNewService: LastNewServicePort = new LastNewService();

  private checkPathParams(id: string): void {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async deleteLastNew(id: string): Promise<void> {
    this.checkPathParams(id);
    await this.lastNewService.deleteLastNew(id);
  }
}
